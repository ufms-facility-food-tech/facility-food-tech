package com.facility.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import javax.imageio.ImageIO;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("api/images")
public class ImageController {

  public record ImageMetadata(
    String fileName,
    String alt,
    int width,
    int height
  ) {}

  @Value("${image.upload.dir}")
  private String uploadDir;

  private final Set<ImageMetadata> imageMetadataDb = new HashSet<>();

  private final Log log = LogFactory.getLog(ImageController.class);

  @PostConstruct
  public void init() {
    File directory = new File(uploadDir);
    if (!directory.exists()) {
      boolean created = directory.mkdirs();
      if (created) {
        log.info(
          "image upload directory created: " + directory.getAbsolutePath()
        );
      } else {
        log.error("failed to create upload directory \"" + uploadDir + "\"");
      }
    } else {
      log.info("upload directory \"" + uploadDir + "\" already exists");
    }

    // populate image metadata
    try {
      Files.walk(Path.of(uploadDir))
        .filter(
          file ->
            Files.isRegularFile(file) &&
            !file.getFileName().toString().endsWith(".txt")
        )
        .forEach(filePath -> {
          try {
            var bufferedImage = ImageIO.read(filePath.toFile());
            if (bufferedImage == null) {
              log.error(
                "failed to read image \"" + filePath.getFileName() + "\""
              );
              return;
            }

            String alt = null;
            var altFileName =
              filePath
                .getFileName()
                .toString()
                .replaceAll("(?<!^)[.][^.]*$", "") +
              ".txt";
            if (Files.exists(Path.of(uploadDir, altFileName))) {
              alt = new String(
                Files.readAllBytes(Path.of(uploadDir, altFileName))
              );
            }

            imageMetadataDb.add(
              new ImageMetadata(
                filePath.getFileName().toString(),
                alt,
                bufferedImage.getWidth(),
                bufferedImage.getHeight()
              )
            );
          } catch (IOException e) {
            log.error(
              "failed to read image \"" + filePath.getFileName() + "\""
            );
            log.error(e.getMessage());
          }
        });
    } catch (IOException e) {
      log.error("failed to retrieve images from the upload directory");
      log.error(e.getMessage());
    }
  }

  @PostMapping("/upload")
  public ResponseEntity<?> uploadImage(
    @RequestParam("image") MultipartFile image,
    @RequestParam("alt") Optional<String> alt
  ) {
    String timestamp = new SimpleDateFormat(
      "yyyy-MM-dd_HH'h'mm'min'ss's'SSS'ms'_"
    ).format(new Date(System.currentTimeMillis()));
    String extension = StringUtils.getFilenameExtension(
      image.getOriginalFilename()
    );
    String fileName =
      timestamp +
      (int) (Math.random() * 1000) +
      (extension == null || extension.isEmpty() ? "" : '.' + extension);

    Path filePath = Path.of(uploadDir, fileName);

    try {
      Files.write(filePath, image.getBytes());

      // get image dimensions
      var bufferedImage = ImageIO.read(image.getInputStream());
      if (bufferedImage == null) {
        log.error("failed to read file \"" + filePath.toAbsolutePath() + "\"");
        return ResponseEntity.badRequest()
          .body("error reading file \"" + fileName + "\"");
      }

      // save metadata
      ImageMetadata metadata = new ImageMetadata(
        fileName,
        alt.orElse(null),
        bufferedImage.getWidth(),
        bufferedImage.getHeight()
      );
      imageMetadataDb.add(metadata);

      if (alt.isPresent()) {
        Files.write(
          Path.of(
            uploadDir,
            fileName.replaceAll("(?<!^)[.][^.]*$", "") + ".txt"
          ),
          alt.get().getBytes()
        );
      }

      return ResponseEntity.ok().body(metadata);
    } catch (IOException e) {
      log.error("failed to upload image \"" + filePath.toAbsolutePath() + "\"");
      log.error(e.getMessage());
      return ResponseEntity.badRequest().body("image upload failed");
    }
  }

  @GetMapping
  @Operation(
    operationId = "getImages",
    summary = "Get all images",
    description = "Get all images in the upload directory",
    responses = {
      @ApiResponse(
        responseCode = "200",
        description = "OK",
        content = {
          @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = ImageMetadata.class)
          ),
        }
      ),
      @ApiResponse(
        responseCode = "500",
        description = "Internal Server Error",
        content = {
          @Content(
            mediaType = "application/json",
            schema = @Schema(implementation = String.class)
          ),
        }
      ),
    }
  )
  public ResponseEntity<?> getImages() {
    try {
      var fileNames = Files.list(Path.of(uploadDir)).filter(
        filePath ->
          Files.isRegularFile(filePath) &&
          !filePath.getFileName().toString().endsWith(".txt")
      );
      var filesNotInMetadata = fileNames.filter(fileName -> {
        return !imageMetadataDb
          .stream()
          .anyMatch(metadata ->
            metadata.fileName().equals(fileName.getFileName().toString())
          );
      });

      filesNotInMetadata.forEach(fileName -> {
        try {
          var bufferedImage = ImageIO.read(fileName.toFile());
          if (bufferedImage == null) {
            log.error(
              "failed to read image \"" + fileName.toAbsolutePath() + "\""
            );
            return;
          }
          imageMetadataDb.add(
            new ImageMetadata(
              fileName.getFileName().toString(),
              null,
              bufferedImage.getWidth(),
              bufferedImage.getHeight()
            )
          );
        } catch (IOException e) {
          log.error(
            "failed to read image \"" + fileName.toAbsolutePath() + "\""
          );
          log.error(e.getMessage());
        }
      });

      return ResponseEntity.ok().body(imageMetadataDb);
    } catch (IOException e) {
      log.error("failed to retrieve images from the upload directory");
      log.error(e.getMessage());
      return ResponseEntity.internalServerError()
        .body("failed to retrieve images from the upload directory");
    }
  }

  @PutMapping("/{fileName}")
  public ResponseEntity<?> updateImage(
    @PathVariable String fileName,
    @RequestParam("alt") Optional<String> alt
  ) {
    Path filePath = Path.of(uploadDir, fileName);
    if (!Files.exists(filePath)) {
      log.error(
        "image at \"" + filePath.toAbsolutePath() + "\" does not exist"
      );
      return ResponseEntity.notFound().build();
    }

    if (!Files.isRegularFile(filePath)) {
      log.error(
        "image at \"" + filePath.toAbsolutePath() + "\" is not a regular file"
      );
      return ResponseEntity.badRequest()
        .body("image \"" + fileName + "\" is not a regular file");
    }
    try {
      // get image dimensions
      var bufferedImage = ImageIO.read(filePath.toFile());
      if (bufferedImage == null) {
        log.error("failed to read image \"" + filePath.toAbsolutePath() + "\"");
        return ResponseEntity.internalServerError()
          .body("failed to read image \"" + fileName + "\"");
      }

      // save metadata
      ImageMetadata metadata = new ImageMetadata(
        fileName,
        alt.orElse(null),
        bufferedImage.getWidth(),
        bufferedImage.getHeight()
      );
      imageMetadataDb.removeIf(imageMetadata ->
        imageMetadata.fileName().equals(fileName)
      );
      imageMetadataDb.add(metadata);

      if (alt.isPresent()) {
        Files.write(
          Path.of(
            uploadDir,
            fileName.replaceAll("(?<!^)[.][^.]*$", "") + ".txt"
          ),
          alt.get().getBytes()
        );
      }

      return ResponseEntity.ok().body(metadata);
    } catch (IOException e) {
      log.error("failed to update image \"" + filePath.toAbsolutePath() + "\"");
      log.error(e.getMessage());
      return ResponseEntity.internalServerError()
        .body("failed to update image \"" + fileName + "\"");
    }
  }

  @DeleteMapping("/{fileName}")
  public ResponseEntity<?> deleteImage(@PathVariable String fileName) {
    Path filePath = Path.of(uploadDir, fileName);
    if (!Files.exists(filePath)) {
      log.error("image \"" + filePath.toAbsolutePath() + "\" does not exist");
      return ResponseEntity.notFound().build();
    }

    if (!Files.isRegularFile(filePath)) {
      log.error(
        "image \"" + filePath.toAbsolutePath() + "\" is not a regular file"
      );
      return ResponseEntity.badRequest()
        .body("image \"" + fileName + "\" is not a regular file");
    }

    try {
      Files.delete(filePath);
      Files.deleteIfExists(
        Path.of(uploadDir, fileName.replaceAll("(?<!^)[.][^.]*$", "") + ".txt")
      );

      imageMetadataDb.removeIf(metadata -> metadata.fileName().equals(fileName)
      );

      return ResponseEntity.ok().build();
    } catch (IOException e) {
      log.error(
        "failed to delete image at \"" + filePath.toAbsolutePath() + "\""
      );
      log.error(e.getMessage());
      return ResponseEntity.internalServerError()
        .body("failed to delete image \"" + fileName + "\"");
    }
  }
}

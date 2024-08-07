package com.facility.controller;

import com.facility.dto.PeptideoDTO;
import com.facility.model.Organismo;
import com.facility.model.Peptideo;
import com.facility.repository.OrganismoRepository;
import com.facility.repository.PeptideoRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/peptideos")
public class PeptideoController {

  @Autowired
  private PeptideoRepository peptideoRepository;

  @Autowired
  private OrganismoRepository organismoRepository;

  @PostMapping
  public ResponseEntity<PeptideoDTO> create(
    @RequestBody PeptideoDTO peptideoDTO
  ) {
    var peptideoEntity = peptideoDTO.toEntity();

    // optionally persist organismo
    if (peptideoDTO.organismo() != null) {
      var organismoEntity = peptideoDTO.organismo().toEntity();

      if (organismoEntity.getId() == null) {
        var optional = organismoRepository.findBy(
          Example.of(
            organismoEntity,
            ExampleMatcher.matching()
              .withIgnorePaths("id", "peptideo", "origem", "nomepopular")
              .withIgnoreCase()
              .withStringMatcher(ExampleMatcher.StringMatcher.EXACT)
          ),
          q -> q.first()
        );

        if (optional.isPresent()) {
          organismoEntity = optional.get();
        }

        peptideoEntity.setOrganismo(organismoEntity);
      }

      organismoRepository.save(organismoEntity);
    }

    var saved = PeptideoDTO.fromEntity(peptideoRepository.save(peptideoEntity));
    return ResponseEntity.ok().body(saved);
  }

  @GetMapping
  public ResponseEntity<List<PeptideoDTO>> findAll() {
    List<PeptideoDTO> peptideos = peptideoRepository
      .findAll()
      .stream()
      .map(PeptideoDTO::fromEntity)
      .collect(Collectors.toList());
    return ResponseEntity.ok().body(peptideos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PeptideoDTO> findById(@PathVariable Long id) {
    if (id == null) {
      return ResponseEntity.badRequest().build();
    }

    return peptideoRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(PeptideoDTO.fromEntity(record)))
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public ResponseEntity<PeptideoDTO> update(
    @PathVariable("id") Optional<Long> id,
    @RequestBody PeptideoDTO peptideoDTO
  ) {
    if (id.isEmpty()) {
      if (peptideoDTO.id() == null) {
        return ResponseEntity.badRequest().build();
      }
      id = Optional.of(peptideoDTO.id());
    }

    return peptideoRepository
      .findById(id.get())
      .map(peptideo -> {
        Peptideo toSave = peptideoDTO.toEntity();
        toSave.setId(peptideo.getId());

        if (peptideoDTO.organismo() != null) {
          Organismo organismoToSave = peptideoDTO.organismo().toEntity();

          if (peptideo.getOrganismo() != null) {
            organismoToSave.setId(peptideo.getOrganismo().getId());
            organismoToSave.setPeptideo(peptideo.getOrganismo().getPeptideo());
          }

          toSave.setOrganismo(organismoToSave);

          organismoRepository.save(toSave.getOrganismo());
        } else if (peptideo.getOrganismo() != null) {
          toSave.setOrganismo(peptideo.getOrganismo());

          organismoRepository.save(toSave.getOrganismo());
        }

        return ResponseEntity.ok()
          .body(PeptideoDTO.fromEntity(peptideoRepository.save(toSave)));
      })
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return peptideoRepository
      .findById(id)
      .map(record -> {
        peptideoRepository.deleteById(id);
        return ResponseEntity.ok().body("peptideo apagado com sucesso.");
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

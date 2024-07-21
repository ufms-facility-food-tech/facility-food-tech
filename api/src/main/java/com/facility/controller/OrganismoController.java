package com.facility.controller;

import com.facility.model.Organismo;
import com.facility.repository.OrganismoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.ServerRequest.Headers;

@RestController
@RequestMapping("organismos")
public class OrganismoController {

  @Autowired
  private OrganismoRepository organismoRepository;

  @GetMapping
  public ResponseEntity<List<Organismo>> findAll() {
    return ResponseEntity.ok().body(organismoRepository.findAll());
  }

  @PostMapping
  public ResponseEntity<Organismo> create(
    @RequestBody Organismo organismo,
    Headers headers
  ) {
    // TODO: validate organismo
    // TODO: add CREATED response?
    return ResponseEntity.ok().body(organismoRepository.save(organismo));
  }

  @GetMapping(path = { "/{id}" })
  public ResponseEntity<Organismo> findById(@PathVariable Long id) {
    return organismoRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(record))
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<Organismo> update(
    @PathVariable("id") Optional<Long> id,
    @RequestBody Organismo organismo
  ) {
    if (id.isEmpty()) {
      if (organismo.getId() == null) {
        return ResponseEntity.badRequest().build();
      }
      id = Optional.of(organismo.getId());
    }

    organismo.setId(id.get());

    return organismoRepository
      .findById(id.get())
      .map(
        record -> ResponseEntity.ok().body(organismoRepository.save(organismo))
      )
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return organismoRepository
      .findById(id)
      .map(record -> {
        organismoRepository.deleteById(id);
        return ResponseEntity.ok().body("organismo apagado com sucesso.");
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

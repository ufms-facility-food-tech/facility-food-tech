package com.facility.controller;

import com.facility.model.Organismo;
import com.facility.repository.OrganismoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("organismos")
public class OrganismoController {

  @Autowired
  private OrganismoRepository organismoRepository;

  @GetMapping
  public ResponseEntity<List<Organismo>> findAll() {
    List<Organismo> organismos = organismoRepository.findAll();
    return new ResponseEntity<>(organismos, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<Organismo> create(@RequestBody Organismo organismo) {
    return new ResponseEntity<>(
      organismoRepository.save(organismo),
      HttpStatus.CREATED
    );
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
    @PathVariable("id") Long id,
    @RequestBody Organismo organismo
  ) {
    organismo.setId(id);
    return organismoRepository
      .findById(id)
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
        return ResponseEntity.ok().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

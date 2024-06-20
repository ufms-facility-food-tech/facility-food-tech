package com.facility.controller;

import com.facility.dto.OrganismoDTO;
import com.facility.model.Organismo;
import com.facility.repository.OrganismoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("organismos")
public class OrganismoController {

  @Autowired private OrganismoRepository organismoRepository;

  @GetMapping
  public ResponseEntity<List<OrganismoDTO>> findAll() {
    List<OrganismoDTO> organismos =
        organismoRepository.findAll().stream().map(OrganismoDTO::new).collect(Collectors.toList());
    return new ResponseEntity<>(organismos, HttpStatus.OK);
  }

  @GetMapping(path = {"/query"})
  public ResponseEntity<List<OrganismoDTO>> query(
      @RequestParam Optional<String> especie,
      @RequestParam Optional<String> familia,
      @RequestParam Optional<String> origem,
      @RequestParam Optional<String> nomeCientifico) {
    Organismo organismo = new Organismo();
    if (especie.isPresent()) {
      organismo.setEspecie(especie.get());
    }
    if (familia.isPresent()) {
      organismo.setFamilia(familia.get());
    }
    if (origem.isPresent()) {
      organismo.setOrigem(origem.get());
    }
    if (nomeCientifico.isPresent()) {
      organismo.setNomeCientifico(nomeCientifico.get());
    }
    var organismos =
        organismoRepository
            .findAll(
                Example.of(
                    organismo,
                    ExampleMatcher.matching().withStringMatcher(StringMatcher.CONTAINING)))
            .stream()
            .map(OrganismoDTO::new)
            .collect(Collectors.toList());
    return new ResponseEntity<>(organismos, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<OrganismoDTO> create(@RequestBody OrganismoDTO organismoDTO) {
    var saved = new OrganismoDTO(organismoRepository.save(organismoDTO.toEntity()));
    return new ResponseEntity<>(saved, HttpStatus.CREATED);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<OrganismoDTO> findById(@PathVariable Long id) {
    return organismoRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(new OrganismoDTO(record)))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<OrganismoDTO> update(
      @PathVariable("id") Long id, @RequestBody OrganismoDTO organismoDTO) {
    return organismoRepository
        .findById(id)
        .map(
            organismo -> {
              organismoDTO.setId(id);
              Organismo updated = organismoRepository.save(organismoDTO.toEntity());
              return ResponseEntity.ok().body(new OrganismoDTO(updated));
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return organismoRepository
        .findById(id)
        .map(
            record -> {
              organismoRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

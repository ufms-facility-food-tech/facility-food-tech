package com.facility.controller;

import com.facility.dto.NomePopularDTO;
import com.facility.model.NomePopular;
import com.facility.repository.NomePopularRepository;
import java.util.List;
import java.util.stream.Collectors;
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
@RequestMapping("nomes-populares")
public class NomePopularController {

  @Autowired private NomePopularRepository nomePopularRepository;

  @GetMapping
  public ResponseEntity<List<NomePopularDTO>> findAll() {
    List<NomePopularDTO> nomesPopulares =
        nomePopularRepository.findAll().stream()
            .map(NomePopularDTO::new)
            .collect(Collectors.toList());
    return new ResponseEntity<>(nomesPopulares, HttpStatus.OK);
  }

  @PostMapping
  public NomePopular create(@RequestBody NomePopular nomePopular) {
    return nomePopularRepository.save(nomePopular);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return nomePopularRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<NomePopular> update(
      @PathVariable("id") Long id, @RequestBody NomePopular nomePopular) {
    return nomePopularRepository
        .findById(id)
        .map(
            record -> {
              record.setNome(nomePopular.getNome());
              record.setOrganismo(nomePopular.getOrganismo());
              NomePopular updated = nomePopularRepository.save(record);
              return ResponseEntity.ok().body(updated);
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return nomePopularRepository
        .findById(id)
        .map(
            record -> {
              nomePopularRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

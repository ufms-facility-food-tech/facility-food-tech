package com.facility.controller;

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

import com.facility.domain.AtivAntibacteriana;
import com.facility.dto.AtivAntibacterianaDTO;
import com.facility.repository.AtivAntibacterianaRepository;

@RestController
@RequestMapping("v1/ativantibacteriana")
public class AtivAntibacterianaController {

  @Autowired private AtivAntibacterianaRepository ativAntibacterianaRepository;

  @GetMapping
  public ResponseEntity<List<AtivAntibacterianaDTO>> findAll() {
    List<AtivAntibacterianaDTO> ativAntibacterianas = ativAntibacterianaRepository
        .findAll().stream()
        .map(ativAntibacteriana -> new AtivAntibacterianaDTO(ativAntibacteriana))
        .collect(Collectors.toList());
    if (ativAntibacterianas == null || ativAntibacterianas.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(ativAntibacterianas, HttpStatus.OK);
  }

  @PostMapping
  public AtivAntibacteriana create(@RequestBody AtivAntibacteriana ativAntibacteriana) {
    return ativAntibacterianaRepository.save(ativAntibacteriana);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return ativAntibacterianaRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<AtivAntibacteriana> update(
      @PathVariable("id") Long id, @RequestBody AtivAntibacteriana ativAntibacteriana) {
    return ativAntibacterianaRepository
        .findById(id)
        .map(
            record -> {
              record.setAtivAntibacterDesc(ativAntibacteriana.getAtivAntibacterDesc());
              record.setPeptideo(ativAntibacteriana.getPeptideo());
              AtivAntibacteriana updated = ativAntibacterianaRepository.save(record);
              return ResponseEntity.ok().body(updated);
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return ativAntibacterianaRepository
        .findById(id)
        .map(
            record -> {
              ativAntibacterianaRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

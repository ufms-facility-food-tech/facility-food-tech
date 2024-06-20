package com.facility.controller;

import com.facility.dto.AtivAntibacterianaDTO;
import com.facility.repository.AtivAntibacterianaRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("atividades-antibacterianas")
public class AtivAntibacterianaController {

  @Autowired private AtivAntibacterianaRepository ativAntibacterianaRepository;

  @GetMapping
  public ResponseEntity<List<AtivAntibacterianaDTO>> findAll() {
    List<AtivAntibacterianaDTO> ativAntibacterianas =
        ativAntibacterianaRepository.findAll().stream()
            .map(ativAntibacteriana -> new AtivAntibacterianaDTO(ativAntibacteriana))
            .collect(Collectors.toList());
    return new ResponseEntity<>(ativAntibacterianas, HttpStatus.OK);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<AtivAntibacterianaDTO> findById(@PathVariable Long id) {
    return ativAntibacterianaRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(new AtivAntibacterianaDTO(record)))
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

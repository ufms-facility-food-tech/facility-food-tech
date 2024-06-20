package com.facility.controller;

import com.facility.dto.AtivAntifungicaDTO;
import com.facility.repository.AtivAntifungicaRepository;
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
@RequestMapping("atividades-antifungicas")
public class AtivAntifungicaController {

  @Autowired private AtivAntifungicaRepository ativAntiFungicaRepository;

  @GetMapping
  public ResponseEntity<List<AtivAntifungicaDTO>> findAll() {
    List<AtivAntifungicaDTO> ativsAntifungicas =
        ativAntiFungicaRepository.findAll().stream()
            .map(ativAntifungica -> new AtivAntifungicaDTO(ativAntifungica))
            .collect(Collectors.toList());
    return new ResponseEntity<>(ativsAntifungicas, HttpStatus.OK);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return ativAntiFungicaRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(new AtivAntifungicaDTO(record)))
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return ativAntiFungicaRepository
        .findById(id)
        .map(
            record -> {
              ativAntiFungicaRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

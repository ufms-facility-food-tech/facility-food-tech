package com.facility.controller;

import com.facility.dto.AtivCitotoxicaDTO;
import com.facility.repository.AtivCitotoxicaRepository;
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
@RequestMapping("atividades-citotoxicas")
public class AtivCitotoxicaController {

  @Autowired
  private AtivCitotoxicaRepository ativCitotoxicaRepository;

  @GetMapping
  public ResponseEntity<List<AtivCitotoxicaDTO>> findAll() {
    List<AtivCitotoxicaDTO> ativsCitotoxicas = ativCitotoxicaRepository
      .findAll()
      .stream()
      .map(ativCitotoxica -> new AtivCitotoxicaDTO(ativCitotoxica))
      .collect(Collectors.toList());
    return new ResponseEntity<>(ativsCitotoxicas, HttpStatus.OK);
  }

  @GetMapping(path = { "/{id}" })
  public ResponseEntity<AtivCitotoxicaDTO> findById(@PathVariable Long id) {
    return ativCitotoxicaRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(new AtivCitotoxicaDTO(record)))
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return ativCitotoxicaRepository
      .findById(id)
      .map(record -> {
        ativCitotoxicaRepository.deleteById(id);
        return ResponseEntity.ok().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

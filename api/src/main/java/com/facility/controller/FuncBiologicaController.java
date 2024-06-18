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

import com.facility.domain.FuncBiologica;
import com.facility.dto.FuncBiologicaDTO;
import com.facility.repository.FuncBiologicaRepository;

@RestController
@RequestMapping("v1/funcoesbiologicas")
public class FuncBiologicaController {

  @Autowired private FuncBiologicaRepository funcBiologicaRepository;

  @GetMapping
  public ResponseEntity<List<FuncBiologicaDTO>> findAll() {
    List<FuncBiologicaDTO> funcsBiologicas = funcBiologicaRepository
        .findAll().stream()
        .map(funcBiologica -> new FuncBiologicaDTO(funcBiologica))
        .collect(Collectors.toList());
    if (funcsBiologicas == null || funcsBiologicas.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(funcsBiologicas, HttpStatus.OK);
  }

  @PostMapping
  public FuncBiologica create(@RequestBody FuncBiologica funcBiologica) {
    return funcBiologicaRepository.save(funcBiologica);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return funcBiologicaRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<FuncBiologica> update(
      @PathVariable("id") Long id, @RequestBody FuncBiologica funcBiologica) {
    return funcBiologicaRepository
        .findById(id)
        .map(
            record -> {
              record.setFuncBiolDesc(funcBiologica.getFuncBiolDesc());
              record.setPeptideo(funcBiologica.getPeptideo());
              FuncBiologica updated = funcBiologicaRepository.save(record);
              return ResponseEntity.ok().body(updated);
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return funcBiologicaRepository
        .findById(id)
        .map(
            record -> {
              funcBiologicaRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

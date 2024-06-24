package com.facility.controller;

import com.facility.dto.FuncBiologicaDTO;
import com.facility.repository.FuncBiologicaRepository;
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
@RequestMapping("funcoes-biologicas")
public class FuncBiologicaController {

  @Autowired
  private FuncBiologicaRepository funcBiologicaRepository;

  @GetMapping
  public ResponseEntity<List<FuncBiologicaDTO>> findAll() {
    List<FuncBiologicaDTO> funcsBiologicas = funcBiologicaRepository
      .findAll()
      .stream()
      .map(funcBiologica -> new FuncBiologicaDTO(funcBiologica))
      .collect(Collectors.toList());
    return new ResponseEntity<>(funcsBiologicas, HttpStatus.OK);
  }

  @GetMapping(path = { "/{id}" })
  public ResponseEntity<FuncBiologicaDTO> findById(@PathVariable Long id) {
    return funcBiologicaRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(new FuncBiologicaDTO(record)))
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return funcBiologicaRepository
      .findById(id)
      .map(record -> {
        funcBiologicaRepository.deleteById(id);
        return ResponseEntity.ok().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

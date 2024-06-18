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

import com.facility.domain.CasoSucesso;
import com.facility.dto.CasoSucessoDTO;
import com.facility.repository.CasoSucessoRepository;

@RestController
@RequestMapping("v1/casossucesso")
public class CasoSucessoController {

  @Autowired private CasoSucessoRepository casoSucessoRepository;

  @GetMapping
  public ResponseEntity<List<CasoSucessoDTO>> findAll() {
    List<CasoSucessoDTO> casosSucessos = casoSucessoRepository
        .findAll().stream()
        .map(casoSucesso -> new CasoSucessoDTO(casoSucesso))
        .collect(Collectors.toList());
    if (casosSucessos == null || casosSucessos.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(casosSucessos, HttpStatus.OK);
  }

  @PostMapping
  public CasoSucesso create(@RequestBody CasoSucesso casoSucesso) {
    return casoSucessoRepository.save(casoSucesso);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return casoSucessoRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<CasoSucesso> update(
      @PathVariable("id") Long id, @RequestBody CasoSucesso casoSucesso) {
    return casoSucessoRepository
        .findById(id)
        .map(
            record -> {
              record.setCaso(casoSucesso.getCaso());
              record.setPeptideo(casoSucesso.getPeptideo());
              CasoSucesso updated = casoSucessoRepository.save(record);
              return ResponseEntity.ok().body(updated);
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return casoSucessoRepository
        .findById(id)
        .map(
            record -> {
              casoSucessoRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

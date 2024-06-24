package com.facility.controller;

import com.facility.dto.CasoSucessoDTO;
import com.facility.repository.CasoSucessoRepository;
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
@RequestMapping("caso-sucesso")
public class CasoSucessoController {

  @Autowired
  private CasoSucessoRepository casoSucessoRepository;

  @GetMapping
  public ResponseEntity<List<CasoSucessoDTO>> findAll() {
    List<CasoSucessoDTO> casosSucessos = casoSucessoRepository
      .findAll()
      .stream()
      .map(casoSucesso -> new CasoSucessoDTO(casoSucesso))
      .collect(Collectors.toList());
    return new ResponseEntity<>(casosSucessos, HttpStatus.OK);
  }

  @GetMapping(path = { "/{id}" })
  public ResponseEntity<CasoSucessoDTO> findById(@PathVariable Long id) {
    return casoSucessoRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(new CasoSucessoDTO(record)))
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return casoSucessoRepository
      .findById(id)
      .map(record -> {
        casoSucessoRepository.deleteById(id);
        return ResponseEntity.ok().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

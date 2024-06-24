package com.facility.controller;

import com.facility.dto.PublicacaoDTO;
import com.facility.repository.PublicacaoRepository;
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
@RequestMapping("publicacoes")
public class PublicacaoController {

  @Autowired
  private PublicacaoRepository publicacaoRepository;

  @GetMapping
  public ResponseEntity<List<PublicacaoDTO>> findAll() {
    List<PublicacaoDTO> publicacoes = publicacaoRepository
      .findAll()
      .stream()
      .map(puplicacao -> new PublicacaoDTO(puplicacao))
      .collect(Collectors.toList());
    return new ResponseEntity<>(publicacoes, HttpStatus.OK);
  }

  @GetMapping(path = { "/{id}" })
  public ResponseEntity<PublicacaoDTO> findById(@PathVariable Long id) {
    return publicacaoRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(new PublicacaoDTO(record)))
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return publicacaoRepository
      .findById(id)
      .map(record -> {
        publicacaoRepository.deleteById(id);
        return ResponseEntity.ok().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }
}

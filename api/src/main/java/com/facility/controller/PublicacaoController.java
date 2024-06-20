package com.facility.controller;

import com.facility.dto.PublicacaoDTO;
import com.facility.model.Publicacao;
import com.facility.repository.PublicacaoRepository;
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
@RequestMapping("publicacoes")
public class PublicacaoController {

  @Autowired private PublicacaoRepository publicacaoRepository;

  @GetMapping
  public ResponseEntity<List<PublicacaoDTO>> findAll() {
    List<PublicacaoDTO> publicacoes =
        publicacaoRepository.findAll().stream()
            .map(puplicacao -> new PublicacaoDTO(puplicacao))
            .collect(Collectors.toList());
    if (publicacoes == null || publicacoes.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(publicacoes, HttpStatus.OK);
  }

  @PostMapping
  public Publicacao create(@RequestBody Publicacao publicacao) {
    return publicacaoRepository.save(publicacao);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return publicacaoRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<Publicacao> update(
      @PathVariable("id") Long id, @RequestBody Publicacao publicacao) {
    return publicacaoRepository
        .findById(id)
        .map(
            record -> {
              record.setUrl(publicacao.getUrl());
              record.setPeptideo(publicacao.getPeptideo());
              Publicacao updated = publicacaoRepository.save(record);
              return ResponseEntity.ok().body(updated);
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return publicacaoRepository
        .findById(id)
        .map(
            record -> {
              publicacaoRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

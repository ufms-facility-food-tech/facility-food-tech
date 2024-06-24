package com.facility.controller;

import com.facility.dto.PeptideoDTO;
import com.facility.enums.TipoPeptideo;
import com.facility.model.Peptideo;
import com.facility.repository.PeptideoRepository;
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
@RequestMapping("peptideos")
public class PeptideoController {

  @Autowired
  private PeptideoRepository peptideoRepository;

  @PostMapping
  public ResponseEntity<PeptideoDTO> save(
    @RequestBody PeptideoDTO peptideoDTO
  ) {
    var saved = new PeptideoDTO(
      peptideoRepository.save(peptideoDTO.toEntity())
    );
    return new ResponseEntity<>(saved, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<PeptideoDTO>> findAll() {
    List<PeptideoDTO> peptideos = peptideoRepository
      .findAll()
      .stream()
      .map(PeptideoDTO::new)
      .collect(Collectors.toList());
    return new ResponseEntity<>(peptideos, HttpStatus.OK);
  }

  @GetMapping(path = { "/{id}" })
  public ResponseEntity<PeptideoDTO> findById(@PathVariable Long id) {
    return peptideoRepository
      .findById(id)
      .map(record -> ResponseEntity.ok().body(new PeptideoDTO(record)))
      .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<PeptideoDTO> update(
    @PathVariable("id") Long id,
    @RequestBody PeptideoDTO peptideoDTO
  ) {
    return peptideoRepository
      .findById(id)
      .map(peptideo -> {
        peptideoDTO.setId(id);
        Peptideo updated = peptideoRepository.save(peptideoDTO.toEntity());
        return ResponseEntity.ok().body(new PeptideoDTO(updated));
      })
      .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = { "/{id}" })
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return peptideoRepository
      .findById(id)
      .map(record -> {
        peptideoRepository.deleteById(id);
        return ResponseEntity.ok().build();
      })
      .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping(path = { "tipoPeptideo/{tipoPeptideo}" })
  public ResponseEntity<List<PeptideoDTO>> findByTipoPeptideo(
    @PathVariable("tipoPeptideo") TipoPeptideo tipoPeptideo
  ) {
    List<PeptideoDTO> peptideos = peptideoRepository
      .findByTipoPeptideo(tipoPeptideo)
      .stream()
      .map(PeptideoDTO::new)
      .collect(Collectors.toList());
    return ResponseEntity.ok(peptideos);
  }
}

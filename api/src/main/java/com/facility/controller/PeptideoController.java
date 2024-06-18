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

import com.facility.domain.Peptideo;
import com.facility.dto.PeptideoDTO;
import com.facility.enums.TipoPeptideo;
import com.facility.repository.PeptideoRepository;

@RestController
@RequestMapping("v1/peptideos")
public class PeptideoController {

  @Autowired private PeptideoRepository peptideoRepository;

  @PostMapping
  public Peptideo save(@RequestBody Peptideo peptideo) {
    return peptideoRepository.save(peptideo);
  }

  @GetMapping
  public ResponseEntity<List<PeptideoDTO>> findAll() {
    List<PeptideoDTO> peptideos = peptideoRepository
        .findAll().stream()
        .map(peptideo -> new PeptideoDTO(peptideo))
        .collect(Collectors.toList());
    if (peptideos == null || peptideos.isEmpty()) {
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    return new ResponseEntity<>(peptideos, HttpStatus.OK);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> findById(@PathVariable Long id) {
    return peptideoRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(record))
        .orElse(ResponseEntity.notFound().build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<Peptideo> update(
      @PathVariable("id") Long id, @RequestBody Peptideo peptideo) {
    return peptideoRepository
        .findById(id)
        .map(
            record -> {
              record.setPeptideo(peptideo.getPeptideo());
              record.setQuantAas(peptideo.getQuantAas());
              record.setTipoPeptideo(peptideo.getTipoPeptideo());
              record.setSequencia(peptideo.getSequencia());
              record.setEstruturaTridimensional(peptideo.getEstruturaTridimensional());
              record.setMassaMolecular(peptideo.getMassaMolecular());
              record.setImpediEsterico(peptideo.getImpediEsterico());
              record.setHidrofobocidade(peptideo.getHidrofobocidade());
              record.setPontoIsoeletrico(peptideo.getPontoIsoeletrico());
              record.setHidropatia(peptideo.getHidropatia());
              record.setAnfipaticidade(peptideo.getAnfipaticidade());
              record.setHidrofilicidade(peptideo.getHidrofilicidade());
              record.setCargaLiquiTotal(peptideo.getCargaLiquiTotal());
              record.setIndiceBoman(peptideo.getIndiceBoman());
              record.setDescricao(peptideo.getDescricao());
              record.setOrganismo(peptideo.getOrganismo());
              Peptideo updated = peptideoRepository.save(record);
              return ResponseEntity.ok().body(updated);
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return peptideoRepository
        .findById(id)
        .map(
            record -> {
              peptideoRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping(path = {"tipoPeptideo/{tipoPeptideo}"})
  public ResponseEntity<?> findByTipoPeptideo(
      @PathVariable("tipoPeptideo") TipoPeptideo tipoPeptideo) {
    List<PeptideoDTO> peptideos = peptideoRepository.findByTipoPeptideo(tipoPeptideo).stream()
        .map(peptideo -> new PeptideoDTO(peptideo))
        .collect(Collectors.toList());
    return peptideos == null || peptideos.isEmpty()
        ? ResponseEntity.noContent().build()
        : ResponseEntity.ok(peptideos);
  }
}

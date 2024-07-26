package com.facility.controller;

import com.facility.dto.PeptideoDTO;
import com.facility.model.Organismo;
import com.facility.model.Peptideo;
import com.facility.repository.PeptideoRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.facility.model.PeptideoSpecifications;

@RestController
@RequestMapping("query")
public class QueryController {

  @Autowired
  private PeptideoRepository peptideoRepository;

  @GetMapping
  public List<PeptideoDTO> query(
    @RequestParam Optional<String> origem,
    @RequestParam Optional<String> especie,
    @RequestParam Optional<String> familia,
    @RequestParam Optional<String> casoSucesso,
    @RequestParam Optional<String> nomePopular
  ) {
    var peptideo = new Peptideo();
    peptideo.setOrganismo(new Organismo());
    if (especie.isPresent() && !especie.get().isEmpty()) {
      peptideo.getOrganismo().setEspecie(especie.get());
    }
    if (origem.isPresent() && !origem.get().isEmpty()) {
      peptideo.getOrganismo().setOrigem(origem.get());
    }
    if (familia.isPresent() && !familia.get().isEmpty()) {
      peptideo.getOrganismo().setFamilia(familia.get());
    }

    var result = peptideoRepository.findAll(
      Example.of(
        peptideo,
        ExampleMatcher.matching()
          .withIgnoreCase()
          .withIgnoreNullValues()
          .withStringMatcher(StringMatcher.CONTAINING)
      )
    );

    var r = peptideoRepository.findAll(
      Specification.where(PeptideoSpecifications.hasNomePopular(nomePopular.get()))
    );

    if (r.isEmpty()) {
      return new ArrayList<>();
    }

    return r.stream().map(PeptideoDTO::new).toList();
  }
}

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
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("query")
public class QueryController {

  @Autowired
  private PeptideoRepository peptideoRepository;

  @GetMapping
  public List<PeptideoDTO> query(
    @RequestParam Optional<String> especie,
    @RequestParam Optional<String> origem,
    @RequestParam Optional<String> familia,
    @RequestParam Optional<String> nomePopular,
    @RequestParam Optional<String> descricao,
    @RequestParam Optional<String> hidrofobicidade,
    @RequestParam Optional<String> estruturaTridimensional,
    @RequestParam Optional<String> massaMolecular
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
    if (nomePopular.isPresent() && !nomePopular.get().isEmpty()) {
      peptideo.getOrganismo().addNomePopular(nomePopular.get());
    }
    if (descricao.isPresent() && !descricao.get().isEmpty()) {
      peptideo.setDescricao(descricao.get());
    }
    if (hidrofobicidade.isPresent() && !hidrofobicidade.get().isEmpty()) {
      peptideo.setHidrofobicidade(Double.valueOf(hidrofobicidade.get()));
    }
    if (
      estruturaTridimensional.isPresent() &&
      !estruturaTridimensional.get().isEmpty()
    ) {
      peptideo.setEstruturaTridimensional(estruturaTridimensional.get());
    }
    if (massaMolecular.isPresent() && !massaMolecular.get().isEmpty()) {
      peptideo.setMassaMolecular(Double.valueOf(massaMolecular.get()));
    }
    var result = peptideoRepository.findBy(
      Example.of(
        peptideo,
        ExampleMatcher.matching()
          .withIgnoreCase()
          .withIgnoreNullValues()
          .withStringMatcher(StringMatcher.CONTAINING)
      ),
      q -> q.sortBy(Sort.by("peptideo").ascending()).all()
    );

    if (result.isEmpty()) {
      return new ArrayList<>();
    }

    return result.stream().map(PeptideoDTO::new).toList();
  }
}

package com.facility.dto;

import com.facility.model.Organismo;
import java.util.List;
import java.util.stream.Collectors;

public class OrganismoDTO {

  private Long id;
  private String especie;
  private String origem;
  private String familia;
  List<NomePopularDTO> nomesPopulares;
  List<PeptideoDTO> peptideos;

  public OrganismoDTO(Organismo organismo) {
    this.id = organismo.getId();
    this.especie = organismo.getEspecie();
    this.origem = organismo.getOrigem();
    this.familia = organismo.getFamilia();
    if (organismo.getNomesPopulares() != null) {
      this.nomesPopulares = organismo
        .getNomesPopulares()
        .stream()
        .map(NomePopularDTO::new)
        .collect(Collectors.toList());
    }
    if (organismo.getPeptideos() != null) {
      this.peptideos = organismo
        .getPeptideos()
        .stream()
        .map(PeptideoDTO::new)
        .collect(Collectors.toList());
    }
  }

  public OrganismoDTO() {}

  public Organismo toEntity() {
    Organismo organismo = new Organismo();
    organismo.setId(this.getId());
    organismo.setEspecie(this.getEspecie());
    organismo.setFamilia(this.getFamilia());
    organismo.setOrigem(this.getOrigem());

    if (this.getNomesPopulares() != null) {
      for (NomePopularDTO nomePopular : this.getNomesPopulares()) {
        organismo.addNomePopular(nomePopular.toEntity());
      }
    }

    if (this.getPeptideos() != null) {
      for (PeptideoDTO peptideoDTO : this.getPeptideos()) {
        organismo.addPeptideo(peptideoDTO.toEntity());
      }
    }

    return organismo;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEspecie() {
    return especie;
  }

  public void setEspecie(String especie) {
    this.especie = especie;
  }

  public String getOrigem() {
    return origem;
  }

  public void setOrigem(String origem) {
    this.origem = origem;
  }

  public String getFamilia() {
    return familia;
  }

  public void setFamilia(String familia) {
    this.familia = familia;
  }

  public List<NomePopularDTO> getNomesPopulares() {
    return nomesPopulares;
  }

  public void setNomesPopulares(List<NomePopularDTO> nomesPopulares) {
    this.nomesPopulares = nomesPopulares;
  }

  public List<PeptideoDTO> getPeptideos() {
    return peptideos;
  }

  public void setPeptideos(List<PeptideoDTO> peptideos) {
    this.peptideos = peptideos;
  }
}

package com.facility.dto;

import com.facility.model.Organismo;

public class OrganismoDTO {

  private Long id;
  private String especie;
  private String origem;
  private String familia;
  private String nomeCientifico;

  public OrganismoDTO(Organismo organismo) {
    this.id = organismo.getId();
    this.especie = organismo.getEspecie();
    this.origem = organismo.getOrigem();
    this.familia = organismo.getFamilia();
    this.nomeCientifico = organismo.getNomeCientifico();
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

  public String getNomeCientifico() {
    return nomeCientifico;
  }

  public void setNomeCientifico(String nomeCientifico) {
    this.nomeCientifico = nomeCientifico;
  }
}

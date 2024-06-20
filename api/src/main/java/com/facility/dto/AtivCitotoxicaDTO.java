package com.facility.dto;

import com.facility.model.AtivCitotoxica;

public class AtivCitotoxicaDTO {

  private Long id;
  private String descricao;

  public AtivCitotoxicaDTO(AtivCitotoxica ativCitotoxica) {
    this.id = ativCitotoxica.getId();
    this.descricao = ativCitotoxica.getDescricao();
  }

  public AtivCitotoxicaDTO() {}

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
}

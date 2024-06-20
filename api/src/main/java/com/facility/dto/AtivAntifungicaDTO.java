package com.facility.dto;

import com.facility.model.AtivAntifungica;

public class AtivAntifungicaDTO {

  private Long id;
  private String descricao;

  public AtivAntifungicaDTO(AtivAntifungica ativAntifungica) {
    this.id = ativAntifungica.getId();
    this.descricao = ativAntifungica.getDescricao();
  }

  public AtivAntifungicaDTO() {}

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

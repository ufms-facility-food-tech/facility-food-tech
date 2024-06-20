package com.facility.dto;

import com.facility.model.AtivCitotoxica;
import com.facility.model.Peptideo;

public class AtivCitotoxicaDTO {

  private Long id;
  private String descricao;
  private Peptideo peptideo;

  public AtivCitotoxicaDTO(AtivCitotoxica ativCitotoxica) {
    this.id = ativCitotoxica.getId();
    this.descricao = ativCitotoxica.getDescricao();
    this.peptideo = ativCitotoxica.getPeptideo();
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Peptideo getPeptideo() {
    return peptideo;
  }

  public void setPeptideo(Peptideo peptideo) {
    this.peptideo = peptideo;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }
}

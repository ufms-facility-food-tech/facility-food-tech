package com.facility.dto;

import com.facility.model.AtivAntifungica;
import com.facility.model.Peptideo;

public class AtivAntifungicaDTO {

  private Long id;
  private String descricao;
  private Peptideo peptideo;

  public AtivAntifungicaDTO(AtivAntifungica ativAntifung) {
    this.id = ativAntifung.getId();
    this.descricao = ativAntifung.getDescricao();
    this.peptideo = ativAntifung.getPeptideo();
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

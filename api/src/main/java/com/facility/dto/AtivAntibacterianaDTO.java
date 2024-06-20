package com.facility.dto;

import com.facility.model.AtivAntibacteriana;
import com.facility.model.Peptideo;

public class AtivAntibacterianaDTO {

  private Long id;
  private String descricao;
  private Peptideo peptideo;

  public AtivAntibacterianaDTO(AtivAntibacteriana ativAntibacteriana) {
    this.id = ativAntibacteriana.getId();
    this.descricao = ativAntibacteriana.getDescricao();
    this.peptideo = ativAntibacteriana.getPeptideo();
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

package com.facility.enums;

public enum TipoPeptideo {
  SINTETIZADO("Sintetizado"),
  NATURAL("Natural");

  private final String descricao;

  TipoPeptideo(String descricao) {
    this.descricao = descricao;
  }

  public String getDescricao() {
    return descricao;
  }
}

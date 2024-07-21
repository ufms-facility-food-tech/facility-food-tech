package com.facility.enums;

public enum UnidadeMassaMolecular {
  GRAMAS_POR_MOL("g/mol"),
  DALTON("Da");

  private final String value;

  UnidadeMassaMolecular(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }
}

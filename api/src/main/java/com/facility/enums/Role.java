package com.facility.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
  ADMIN("ADMIN"),
  INSERT("INSERT"),
  UPDATE("UPDATE"),
  DELETE("DELETE");

  private final String value;

  Role(String value) {
    this.value = value;
  }

  public String getValue() {
    return value;
  }

  @Override
  public String getAuthority() {
    return name();
  }
}

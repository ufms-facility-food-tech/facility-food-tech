package com.facility.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Set;

@Entity
public class Organismo implements Serializable {

  private static final long serialVersionUID = 1L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull private String especie;
  @NotNull private String origem;
  @NotNull private String familia;
  @NotNull private String nomeCientifico;

  @OneToMany(mappedBy = "organismo", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<NomePopular> nomesPopulares;

  @OneToMany(mappedBy = "organismo", cascade = CascadeType.ALL, orphanRemoval = false)
  private Set<Peptideo> peptideos;

  public Organismo() {}

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

  public static long getSerialversionuid() {
    return serialVersionUID;
  }

  public String getNomeCientifico() {
    return nomeCientifico;
  }

  public void setNomeCientifico(String nomeCientifico) {
    this.nomeCientifico = nomeCientifico;
  }

  public Set<NomePopular> getNomesPopulares() {
    return nomesPopulares;
  }

  public void setNomesPopulares(Set<NomePopular> nomesPopulares) {
    this.nomesPopulares = nomesPopulares;
  }

  public Set<Peptideo> getPeptideos() {
    return peptideos;
  }

  public void setPeptideos(Set<Peptideo> peptideos) {
    this.peptideos = peptideos;
  }
}

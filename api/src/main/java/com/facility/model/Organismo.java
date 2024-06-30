package com.facility.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Organismo {



  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String especie;
  private String origem;
  private String familia;

  @OneToMany(
    mappedBy = "organismo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<NomePopular> nomesPopulares = new HashSet<>();

  @OneToMany(
    mappedBy = "organismo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<Peptideo> peptideos = new HashSet<>();

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

  public void addPeptideo(Peptideo peptideo) {
    peptideos.add(peptideo);
    peptideo.setOrganismo(this);
  }

  public void removePeptideo(Peptideo peptideo) {
    peptideos.remove(peptideo);
    peptideo.setOrganismo(null);
  }

  public void addNomePopular(NomePopular nomePopular) {
    nomesPopulares.add(nomePopular);
    nomePopular.setOrganismo(this);
  }

  public void removeNomePopular(NomePopular nomePopular) {
    nomesPopulares.remove(nomePopular);
    nomePopular.setOrganismo(null);
  }
}

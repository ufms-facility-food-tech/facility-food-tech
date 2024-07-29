package com.facility.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Organismo {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  private String especie;
  private String origem;
  private String familia;

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> nomePopular = new HashSet<>();

  @OneToMany(mappedBy = "organismo", cascade = CascadeType.ALL)
  @JsonManagedReference
  private Set<Peptideo> peptideo = new HashSet<>();

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

  public Set<String> getNomePopular() {
    return nomePopular;
  }

  public void setNomePopular(Set<String> nomePopular) {
    this.nomePopular = nomePopular;
  }

  public Set<Peptideo> getPeptideo() {
    return peptideo;
  }

  public void setPeptideo(Set<Peptideo> peptideo) {
    this.peptideo = peptideo;
  }

  public void addPeptideo(Peptideo peptideo) {
    this.peptideo.add(peptideo);
    peptideo.setOrganismo(this);
  }

  public void removePeptideo(Peptideo peptideo) {
    this.peptideo.remove(peptideo);
    peptideo.setOrganismo(null);
  }

  public void addNomePopular(String nomePopular) {
    this.nomePopular.add(nomePopular);
  }

  public void removeNomePopular(String nomePopular) {
    this.nomePopular.remove(nomePopular);
  }
}

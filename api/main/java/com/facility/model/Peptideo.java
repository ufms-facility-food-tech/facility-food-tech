package com.facility.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Peptideo {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  private String nomeIdentificador;
  private String sequencia;
  private Boolean sintetizado = false;
  private Boolean resultadoInterno = false;
  private Integer quantidadeAminoacidos;
  private Double massaMolecular;
  private Double massaMolar;

  @ManyToOne
  @JoinColumn(name = "organismo_id", nullable = true)
  private Organismo organismo;

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> funcaoBiologica = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> microbiologia = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> atividadeAntifungica = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> atividadeCelular = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> propriedadesFisicoQuimicas = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> casoSucesso = new HashSet<>();

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<String> caracteristicasAdicionais = new HashSet<>();

  @OneToMany(
    mappedBy = "peptideo",
    cascade = CascadeType.ALL,
    orphanRemoval = true
  )
  @JsonManagedReference
  private Set<Publicacao> publicacao = new HashSet<>();

  @JsonBackReference
  @Hidden
  public Organismo getOrganismo() {
    return organismo;
  }

  public void setOrganismo(Organismo organismo) {
    this.organismo = organismo;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNomeIdentificador() {
    return nomeIdentificador;
  }

  public void setNomeIdentificador(String nomeIdentificador) {
    this.nomeIdentificador = nomeIdentificador;
  }

  public String getSequencia() {
    return sequencia;
  }

  public void setSequencia(String sequencia) {
    this.sequencia = sequencia;
  }

  public Boolean getSintetizado() {
    return sintetizado;
  }

  public void setSintetizado(Boolean sintetizado) {
    this.sintetizado = sintetizado;
  }

  public Boolean getResultadoInterno() {
    return resultadoInterno;
  }

  public void setResultadoInterno(Boolean resultadoInterno) {
    this.resultadoInterno = resultadoInterno;
  }

  public Integer getQuantidadeAminoacidos() {
    return quantidadeAminoacidos;
  }

  public void setQuantidadeAminoacidos(Integer quantidadeAminoacidos) {
    this.quantidadeAminoacidos = quantidadeAminoacidos;
  }

  public Double getMassaMolecular() {
    return massaMolecular;
  }

  public void setMassaMolecular(Double massaMolecular) {
    this.massaMolecular = massaMolecular;
  }

  public Double getMassaMolar() {
    return massaMolar;
  }

  public void setMassaMolar(Double massaMolar) {
    this.massaMolar = massaMolar;
  }

  public Set<String> getFuncaoBiologica() {
    return funcaoBiologica;
  }

  public void setFuncaoBiologica(Set<String> funcaoBiologica) {
    this.funcaoBiologica = funcaoBiologica;
  }

  public Set<String> getMicrobiologia() {
    return microbiologia;
  }

  public void setMicrobiologia(Set<String> microbiologia) {
    this.microbiologia = microbiologia;
  }

  public Set<String> getAtividadeAntifungica() {
    return atividadeAntifungica;
  }

  public void setAtividadeAntifungica(Set<String> atividadeAntifungica) {
    this.atividadeAntifungica = atividadeAntifungica;
  }

  public Set<String> getAtividadeCelular() {
    return atividadeCelular;
  }

  public void setAtividadeCelular(Set<String> atividadeCelular) {
    this.atividadeCelular = atividadeCelular;
  }

  public Set<String> getPropriedadesFisicoQuimicas() {
    return propriedadesFisicoQuimicas;
  }

  public void setPropriedadesFisicoQuimicas(
    Set<String> propriedadesFisicoQuimicas
  ) {
    this.propriedadesFisicoQuimicas = propriedadesFisicoQuimicas;
  }

  public Set<String> getCasoSucesso() {
    return casoSucesso;
  }

  public void setCasoSucesso(Set<String> casoSucesso) {
    this.casoSucesso = casoSucesso;
  }

  public Set<String> getCaracteristicasAdicionais() {
    return caracteristicasAdicionais;
  }

  public void setCaracteristicasAdicionais(
    Set<String> caracteristicasAdicionais
  ) {
    this.caracteristicasAdicionais = caracteristicasAdicionais;
  }

  public Set<Publicacao> getPublicacao() {
    return publicacao;
  }

  public void setPublicacao(Set<Publicacao> publicacao) {
    this.publicacao = publicacao;
  }

  public void addPublicacao(Publicacao publicacao) {
    this.publicacao.add(publicacao);
    publicacao.setPeptideo(this);
  }

  public void removePublicacao(Publicacao publicacao) {
    this.publicacao.remove(publicacao);
    publicacao.setPeptideo(null);
  }
}

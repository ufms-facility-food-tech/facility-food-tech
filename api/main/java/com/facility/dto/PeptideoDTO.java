package com.facility.dto;

import com.facility.enums.TipoPeptideo;
import com.facility.enums.UnidadeMassaMolecular;
import com.facility.model.Peptideo;
import com.facility.model.Publicacao;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class PeptideoDTO {

  private Long id;
  private String nomeIdentificador;
  private String sequencia;
  private Boolean patenteado;
  private Boolean resultadoInterno;
  private Integer quantidadeAminoacidos;
  private TipoPeptideo tipoPeptideo;
  private Double massaMolecular;
  private UnidadeMassaMolecular unidadeMassaMolecular;
  private List<String> funcaoBiologica;
  private List<String> microbiologia;
  private List<String> atividadeAntifungica;
  private List<String> atividadeCelular;
  private List<String> propriedadesFisicoQuimicas;
  private List<String> casoSucesso;
  private List<String> caracteristicasAdicionais;
  List<Publicacao> publicacao;
  OrganismoDTO organismo;

  public PeptideoDTO(Peptideo peptideo) {
    this.id = peptideo.getId();
    this.nomeIdentificador = peptideo.getNomeIdentificador();
    this.sequencia = peptideo.getSequencia();
    this.patenteado = peptideo.getPatenteado();
    this.resultadoInterno = peptideo.getResultadoInterno();
    this.quantidadeAminoacidos = peptideo.getQuantidadeAminoacidos();
    this.tipoPeptideo = peptideo.getTipoPeptideo();
    this.massaMolecular = peptideo.getMassaMolecular();
    this.unidadeMassaMolecular = peptideo.getUnidadeMassaMolecular();

    if (peptideo.getFuncaoBiologica() != null) {
      this.funcaoBiologica = peptideo
        .getFuncaoBiologica()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getMicrobiologia() != null) {
      this.microbiologia = peptideo
        .getMicrobiologia()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeAntifungica() != null) {
      this.atividadeAntifungica = peptideo
        .getAtividadeAntifungica()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeCelular() != null) {
      this.atividadeCelular = peptideo
        .getAtividadeCelular()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getPropriedadesFisicoQuimicas() != null) {
      this.propriedadesFisicoQuimicas = peptideo
        .getPropriedadesFisicoQuimicas()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getCasoSucesso() != null) {
      this.casoSucesso = peptideo
        .getCasoSucesso()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getCaracteristicasAdicionais() != null) {
      this.caracteristicasAdicionais = peptideo
        .getCaracteristicasAdicionais()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getPublicacao() != null) {
      this.publicacao = peptideo
        .getPublicacao()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getOrganismo() != null) {
      this.organismo = new OrganismoDTO(peptideo.getOrganismo());
    }
  }

  public PeptideoDTO() {}

  public Peptideo toEntity() {
    Peptideo peptideoEntity = new Peptideo();
    peptideoEntity.setId(this.getId());
    peptideoEntity.setNomeIdentificador(this.getNomeIdentificador());
    peptideoEntity.setSequencia(this.getSequencia());
    peptideoEntity.setPatenteado(this.getPatenteado());
    peptideoEntity.setResultadoInterno(this.getResultadoInterno());
    peptideoEntity.setQuantidadeAminoacidos(this.getQuantidadeAminoacidos());
    peptideoEntity.setTipoPeptideo(this.getTipoPeptideo());
    peptideoEntity.setMassaMolecular(this.getMassaMolecular());
    peptideoEntity.setUnidadeMassaMolecular(this.getUnidadeMassaMolecular());
    peptideoEntity.setFuncaoBiologica(new HashSet<>(this.getFuncaoBiologica()));
    peptideoEntity.setMicrobiologia(new HashSet<>(this.getMicrobiologia()));
    peptideoEntity.setAtividadeAntifungica(
      new HashSet<>(this.getAtividadeAntifungica())
    );
    peptideoEntity.setAtividadeCelular(
      new HashSet<>(this.getAtividadeCelular())
    );
    peptideoEntity.setPropriedadesFisicoQuimicas(
      new HashSet<>(this.getPropriedadesFisicoQuimicas())
    );
    peptideoEntity.setCasoSucesso(new HashSet<>(this.getCasoSucesso()));
    peptideoEntity.setCaracteristicasAdicionais(
      new HashSet<>(this.getCaracteristicasAdicionais())
    );

    if (this.getPublicacao() != null) {
      for (Publicacao pub : this.getPublicacao()) {
        peptideoEntity.addPublicacao(pub);
      }
    }

    return peptideoEntity;
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

  public Boolean getPatenteado() {
    return patenteado;
  }

  public void setPatenteado(Boolean patenteado) {
    this.patenteado = patenteado;
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

  public TipoPeptideo getTipoPeptideo() {
    return tipoPeptideo;
  }

  public void setTipoPeptideo(TipoPeptideo tipoPeptideo) {
    this.tipoPeptideo = tipoPeptideo;
  }

  public Double getMassaMolecular() {
    return massaMolecular;
  }

  public void setMassaMolecular(Double massaMolecular) {
    this.massaMolecular = massaMolecular;
  }

  public UnidadeMassaMolecular getUnidadeMassaMolecular() {
    return unidadeMassaMolecular;
  }

  public void setUnidadeMassaMolecular(
    UnidadeMassaMolecular unidadeMassaMolecular
  ) {
    this.unidadeMassaMolecular = unidadeMassaMolecular;
  }

  public List<String> getFuncaoBiologica() {
    return funcaoBiologica;
  }

  public void setFuncaoBiologica(List<String> funcaoBiologica) {
    this.funcaoBiologica = funcaoBiologica;
  }

  public List<String> getMicrobiologia() {
    return microbiologia;
  }

  public void setMicrobiologia(List<String> microbiologia) {
    this.microbiologia = microbiologia;
  }

  public List<String> getAtividadeAntifungica() {
    return atividadeAntifungica;
  }

  public void setAtividadeAntifungica(List<String> atividadeAntifungica) {
    this.atividadeAntifungica = atividadeAntifungica;
  }

  public List<String> getAtividadeCelular() {
    return atividadeCelular;
  }

  public void setAtividadeCelular(List<String> atividadeCelular) {
    this.atividadeCelular = atividadeCelular;
  }

  public List<String> getPropriedadesFisicoQuimicas() {
    return propriedadesFisicoQuimicas;
  }

  public void setPropriedadesFisicoQuimicas(
    List<String> propriedadesFisicoQuimicas
  ) {
    this.propriedadesFisicoQuimicas = propriedadesFisicoQuimicas;
  }

  public List<String> getCasoSucesso() {
    return casoSucesso;
  }

  public void setCasoSucesso(List<String> casoSucesso) {
    this.casoSucesso = casoSucesso;
  }

  public List<String> getCaracteristicasAdicionais() {
    return caracteristicasAdicionais;
  }

  public void setCaracteristicasAdicionais(
    List<String> caracteristicasAdicionais
  ) {
    this.caracteristicasAdicionais = caracteristicasAdicionais;
  }

  public List<Publicacao> getPublicacao() {
    return publicacao;
  }

  public void setPublicacao(List<Publicacao> publicacao) {
    this.publicacao = publicacao;
  }

  public OrganismoDTO getOrganismo() {
    return organismo;
  }

  public void setOrganismo(OrganismoDTO organismo) {
    this.organismo = organismo;
  }
}

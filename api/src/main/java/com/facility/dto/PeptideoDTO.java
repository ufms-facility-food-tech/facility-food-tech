package com.facility.dto;

import com.facility.enums.TipoPeptideo;
import com.facility.model.AtivAntibacteriana;
import com.facility.model.AtivAntifungica;
import com.facility.model.AtivCitotoxica;
import com.facility.model.CaracterisAdicionais;
import com.facility.model.CasoSucesso;
import com.facility.model.FuncBiologica;
import com.facility.model.Peptideo;
import com.facility.model.Publicacao;
import java.util.List;
import java.util.stream.Collectors;

public class PeptideoDTO {

  private Long id;
  private String peptideo;
  private Integer quantidadeAminoacidos;
  private TipoPeptideo tipoPeptideo;
  private String sequencia;
  private String estruturaTridimensional;
  private Double massaMolecular;
  private Double impedimentoEsterico;
  private Double hidrofobicidade;
  private Double hidrofibocidade;
  private Double pontoIsoeletrico;
  private Double hidropatia;
  private Double anfipaticidade;
  private Double hidrofilicidade;
  private Integer cargaLiquidaTotal;
  private Double indiceBoman;
  private String descricao;
  List<FuncBiologica> funcBiologicas;
  List<AtivAntibacteriana> ativAntibacterianas;
  List<AtivAntifungica> ativAntifungicas;
  List<AtivCitotoxica> ativCitotoxicas;
  List<CasoSucesso> casosSucesso;
  List<CaracterisAdicionais> caracterisAdicionais;
  List<Publicacao> publicacoes;
  OrganismoDTO organismo;

  public PeptideoDTO(Peptideo peptideo) {
    this.id = peptideo.getId();
    this.peptideo = peptideo.getPeptideo();
    this.quantidadeAminoacidos = peptideo.getQuantidadeAminoacidos();
    this.tipoPeptideo = peptideo.getTipoPeptideo();
    this.sequencia = peptideo.getSequencia();
    this.estruturaTridimensional = peptideo.getEstruturaTridimensional();
    this.massaMolecular = peptideo.getMassaMolecular();
    this.impedimentoEsterico = peptideo.getImpedimentoEsterico();
    this.hidrofobicidade = peptideo.getHidrofobicidade();
    this.hidrofibocidade = peptideo.getHidrofobicidade();
    this.pontoIsoeletrico = peptideo.getPontoIsoeletrico();
    this.hidropatia = peptideo.getHidropatia();
    this.anfipaticidade = peptideo.getAnfipaticidade();
    this.hidrofilicidade = peptideo.getHidrofilicidade();
    this.cargaLiquidaTotal = peptideo.getCargaLiquidaTotal();
    this.indiceBoman = peptideo.getIndiceBoman();
    this.descricao = peptideo.getDescricao();
    this.organismo = new OrganismoDTO(peptideo.getOrganismo());
    if (peptideo.getAtivAntibacterianas() != null) {
      this.funcBiologicas = peptideo
        .getFuncBiologicas()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtivAntifungicas() != null) {
      this.ativAntibacterianas = peptideo
        .getAtivAntibacterianas()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtivAntifungicas() != null) {
      this.ativAntifungicas = peptideo
        .getAtivAntifungicas()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtivCitotoxicas() != null) {
      this.ativCitotoxicas = peptideo
        .getAtivCitotoxicas()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getCasosSucesso() != null) {
      this.casosSucesso = peptideo
        .getCasosSucesso()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getCaracterisAdicionais() != null) {
      this.caracterisAdicionais = peptideo
        .getCaracterisAdicionais()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getPublicacoes() != null) {
      this.publicacoes = peptideo
        .getPublicacoes()
        .stream()
        .collect(Collectors.toList());
    }
  }

  public PeptideoDTO() {}

  public Peptideo toEntity() {
    Peptideo peptideoEntity = new Peptideo();
    peptideoEntity.setId(this.getId());
    peptideoEntity.setPeptideo(this.getPeptideo());
    peptideoEntity.setQuantidadeAminoacidos(this.getQuantidadeAminoacidos());
    peptideoEntity.setTipoPeptideo(this.getTipoPeptideo());
    peptideoEntity.setSequencia(this.getSequencia());
    peptideoEntity.setEstruturaTridimensional(
      this.getEstruturaTridimensional()
    );
    peptideoEntity.setMassaMolecular(this.getMassaMolecular());
    peptideoEntity.setImpedimentoEsterico(this.getImpedimentoEsterico());
    peptideoEntity.setHidrofobicidade(this.getHidrofobicidade());
    peptideoEntity.setPontoIsoeletrico(this.getPontoIsoeletrico());
    peptideoEntity.setHidropatia(this.getHidropatia());
    peptideoEntity.setAnfipaticidade(this.getAnfipaticidade());
    peptideoEntity.setHidrofilicidade(this.getHidrofilicidade());
    peptideoEntity.setCargaLiquidaTotal(this.getCargaLiquidaTotal());
    peptideoEntity.setIndiceBoman(this.getIndiceBoman());
    peptideoEntity.setDescricao(this.getDescricao());

    if (this.getFuncBiologicas() != null) {
      for (FuncBiologica funcBiologica : this.getFuncBiologicas()) {
        peptideoEntity.addFuncBiologica(funcBiologica);
      }
    }

    if (this.getAtivAntibacterianas() != null) {
      for (AtivAntibacteriana ativAntibacteriana : this.getAtivAntibacterianas()) {
        peptideoEntity.addAtivAntibacteriana(ativAntibacteriana);
      }
    }

    if (this.getAtivAntifungicas() != null) {
      for (AtivAntifungica ativAntifungica : this.getAtivAntifungicas()) {
        peptideoEntity.addAtivAntifungica(ativAntifungica);
      }
    }

    if (this.getAtivCitotoxicas() != null) {
      for (AtivCitotoxica ativCitotoxica : this.getAtivCitotoxicas()) {
        peptideoEntity.addAtivCitotoxica(ativCitotoxica);
      }
    }

    if (this.getCasosSucesso() != null) {
      for (CasoSucesso casoSucesso : this.getCasosSucesso()) {
        peptideoEntity.addCasoSucesso(casoSucesso);
      }
    }

    if (this.getCaracterisAdicionais() != null) {
      for (CaracterisAdicionais caracterAdicionais : this.getCaracterisAdicionais()) {
        peptideoEntity.addCaracterisAdicionais(caracterAdicionais);
      }
    }

    if (this.getPublicacoes() != null) {
      for (Publicacao publicacao : this.getPublicacoes()) {
        peptideoEntity.addPublicacao(publicacao);
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

  public String getPeptideo() {
    return peptideo;
  }

  public void setPeptideo(String peptideo) {
    this.peptideo = peptideo;
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

  public String getSequencia() {
    return sequencia;
  }

  public void setSequencia(String sequencia) {
    this.sequencia = sequencia;
  }

  public String getEstruturaTridimensional() {
    return estruturaTridimensional;
  }

  public void setEstruturaTridimensional(String estruturaTridimensional) {
    this.estruturaTridimensional = estruturaTridimensional;
  }

  public Double getMassaMolecular() {
    return massaMolecular;
  }

  public void setMassaMolecular(Double massaMolecular) {
    this.massaMolecular = massaMolecular;
  }

  public Double getImpedimentoEsterico() {
    return impedimentoEsterico;
  }

  public void setImpedimentoEsterico(Double impedimentoEsterico) {
    this.impedimentoEsterico = impedimentoEsterico;
  }

  public Double getHidrofibocidade() {
    return hidrofibocidade;
  }

  public void setHidrofibocidade(Double hidrofibocidade) {
    this.hidrofibocidade = hidrofibocidade;
  }

  public Double getPontoIsoeletrico() {
    return pontoIsoeletrico;
  }

  public void setPontoIsoeletrico(Double pontoIsoeletrico) {
    this.pontoIsoeletrico = pontoIsoeletrico;
  }

  public Double getHidropatia() {
    return hidropatia;
  }

  public void setHidropatia(Double hidropatia) {
    this.hidropatia = hidropatia;
  }

  public Double getAnfipaticidade() {
    return anfipaticidade;
  }

  public void setAnfipaticidade(Double anfipaticidade) {
    this.anfipaticidade = anfipaticidade;
  }

  public Double getHidrofilicidade() {
    return hidrofilicidade;
  }

  public void setHidrofilicidade(Double hidrofilicidade) {
    this.hidrofilicidade = hidrofilicidade;
  }

  public Integer getCargaLiquidaTotal() {
    return cargaLiquidaTotal;
  }

  public void setCargaLiquidaTotal(Integer cargaLiquidaTotal) {
    this.cargaLiquidaTotal = cargaLiquidaTotal;
  }

  public Double getIndiceBoman() {
    return indiceBoman;
  }

  public void setIndiceBoman(Double indiceBoman) {
    this.indiceBoman = indiceBoman;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public List<FuncBiologica> getFuncBiologicas() {
    return funcBiologicas;
  }

  public void setFuncBiologicas(List<FuncBiologica> funcBiologicas) {
    this.funcBiologicas = funcBiologicas;
  }

  public List<AtivAntibacteriana> getAtivAntibacterianas() {
    return ativAntibacterianas;
  }

  public void setAtivAntibacterianas(
    List<AtivAntibacteriana> ativAntibacterianas
  ) {
    this.ativAntibacterianas = ativAntibacterianas;
  }

  public List<AtivAntifungica> getAtivAntifungicas() {
    return ativAntifungicas;
  }

  public void setAtivAntifungicas(List<AtivAntifungica> ativAntifungicas) {
    this.ativAntifungicas = ativAntifungicas;
  }

  public List<AtivCitotoxica> getAtivCitotoxicas() {
    return ativCitotoxicas;
  }

  public void setAtivCitotoxicas(List<AtivCitotoxica> ativCitotoxicas) {
    this.ativCitotoxicas = ativCitotoxicas;
  }

  public List<CasoSucesso> getCasosSucesso() {
    return casosSucesso;
  }

  public void setCasosSucesso(List<CasoSucesso> casosSucesso) {
    this.casosSucesso = casosSucesso;
  }

  public List<CaracterisAdicionais> getCaracterisAdicionais() {
    return caracterisAdicionais;
  }

  public void setCaracterisAdicionais(
    List<CaracterisAdicionais> caracterisAdicionais
  ) {
    this.caracterisAdicionais = caracterisAdicionais;
  }

  public List<Publicacao> getPublicacoes() {
    return publicacoes;
  }

  public void setPublicacoes(List<Publicacao> publicacoes) {
    this.publicacoes = publicacoes;
  }

  public Double getHidrofobicidade() {
    return hidrofobicidade;
  }

  public void setHidrofobicidade(Double hidrofobicidade) {
    this.hidrofobicidade = hidrofobicidade;
  }

  public OrganismoDTO getOrganismo() {
    return organismo;
  }

  public void setOrganismo(OrganismoDTO organismo) {
    this.organismo = organismo;
  }
}

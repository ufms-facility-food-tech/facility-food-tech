package com.facility.dto;

import com.facility.enums.TipoPeptideo;
import com.facility.model.Peptideo;
import com.facility.model.Publicacao;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class PeptideoDTO {

  private Long id;
  private String nome;
  private Integer quantidadeAminoacidos;
  private TipoPeptideo tipoPeptideo;
  private String sequencia;
  private String estruturaTridimensional;
  private Double massaMolecular;
  private Double impedimentoEsterico;
  private Double hidrofobicidade;
  private Double pontoIsoeletrico;
  private Double hidropatia;
  private Double anfipaticidade;
  private Double hidrofilicidade;
  private Integer cargaLiquidaTotal;
  private Double indiceBoman;
  private String descricao;
  List<String> funcaoBiologica;
  List<String> atividadeAntibacteriana;
  List<String> atividadeAntifungica;
  List<String> atividadeCitotoxica;
  List<String> casoSucesso;
  List<String> caracteristicasAdicionais;
  List<Publicacao> publicacao;
  OrganismoDTO organismo;

  public PeptideoDTO(Peptideo peptideo) {
    this.id = peptideo.getId();
    this.nome = peptideo.getNome();
    this.quantidadeAminoacidos = peptideo.getQuantidadeAminoacidos();
    this.tipoPeptideo = peptideo.getTipoPeptideo();
    this.sequencia = peptideo.getSequencia();
    this.estruturaTridimensional = peptideo.getEstruturaTridimensional();
    this.massaMolecular = peptideo.getMassaMolecular();
    this.impedimentoEsterico = peptideo.getImpedimentoEsterico();
    this.hidrofobicidade = peptideo.getHidrofobicidade();
    this.pontoIsoeletrico = peptideo.getPontoIsoeletrico();
    this.hidropatia = peptideo.getHidropatia();
    this.anfipaticidade = peptideo.getAnfipaticidade();
    this.hidrofilicidade = peptideo.getHidrofilicidade();
    this.cargaLiquidaTotal = peptideo.getCargaLiquidaTotal();
    this.indiceBoman = peptideo.getIndiceBoman();
    this.descricao = peptideo.getDescricao();
    this.organismo = new OrganismoDTO(peptideo.getOrganismo());
    if (peptideo.getAtividadeAntibacteriana() != null) {
      this.funcaoBiologica = peptideo
        .getFuncaoBiologica()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeAntifungica() != null) {
      this.atividadeAntibacteriana = peptideo
        .getAtividadeAntibacteriana()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeAntifungica() != null) {
      this.atividadeAntifungica = peptideo
        .getAtividadeAntifungica()
        .stream()
        .collect(Collectors.toList());
    }

    if (peptideo.getAtividadeCitotoxica() != null) {
      this.atividadeCitotoxica = peptideo
        .getAtividadeCitotoxica()
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
  }

  public PeptideoDTO() {}

  public Peptideo toEntity() {
    Peptideo peptideoEntity = new Peptideo();
    peptideoEntity.setId(this.getId());
    peptideoEntity.setNome(this.getNome());
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
    peptideoEntity.setFuncaoBiologica(new HashSet<>(this.getFuncaoBiologica()));
    peptideoEntity.setAtividadeAntibacteriana(
      new HashSet<>(this.getAtividadeAntibacteriana())
    );
    peptideoEntity.setAtividadeAntifungica(
      new HashSet<>(this.getAtividadeAntifungica())
    );
    peptideoEntity.setAtividadeCitotoxica(
      new HashSet<>(this.getAtividadeCitotoxica())
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

  public String getNome() {
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
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

  public List<String> getFuncaoBiologica() {
    return funcaoBiologica;
  }

  public void setFuncaoBiologica(List<String> funcaoBiologica) {
    this.funcaoBiologica = funcaoBiologica;
  }

  public List<String> getAtividadeAntibacteriana() {
    return atividadeAntibacteriana;
  }

  public void setAtividadeAntibacteriana(List<String> atividadeAntibacteriana) {
    this.atividadeAntibacteriana = atividadeAntibacteriana;
  }

  public List<String> getAtividadeAntifungica() {
    return atividadeAntifungica;
  }

  public void setAtividadeAntifungica(List<String> atividadeAntifungica) {
    this.atividadeAntifungica = atividadeAntifungica;
  }

  public List<String> getAtividadeCitotoxica() {
    return atividadeCitotoxica;
  }

  public void setAtividadeCitotoxica(List<String> atividadeCitotoxica) {
    this.atividadeCitotoxica = atividadeCitotoxica;
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

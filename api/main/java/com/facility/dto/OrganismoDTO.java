package com.facility.dto;

import com.facility.model.Organismo;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public record OrganismoDTO(
  Long id,
  String especie,
  String origem,
  String familia,
  List<String> nomePopular
) {
  public static OrganismoDTO fromEntity(Organismo organismo) {
    return new OrganismoDTO(
      organismo.getId(),
      organismo.getEspecie(),
      organismo.getOrigem(),
      organismo.getFamilia(),
      organismo.getNomePopular().stream().collect(Collectors.toList())
    );
  }

  public Organismo toEntity() {
    Organismo organismoEntity = new Organismo();
    organismoEntity.setId(id());
    organismoEntity.setEspecie(especie());
    organismoEntity.setOrigem(origem());
    organismoEntity.setFamilia(familia());
    organismoEntity.setNomePopular(new HashSet<>(nomePopular()));
    return organismoEntity;
  }
}

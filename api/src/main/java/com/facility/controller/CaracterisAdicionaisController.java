package com.facility.controller;

import com.facility.dto.CaracterisAdicionaisDTO;
import com.facility.repository.CaracterisAdicionaisRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("caracteristicas-adicionais")
public class CaracterisAdicionaisController {

  @Autowired private CaracterisAdicionaisRepository caracterisAdicionaisRepository;

  @GetMapping
  public ResponseEntity<List<CaracterisAdicionaisDTO>> findAll() {
    List<CaracterisAdicionaisDTO> caracterisAdicionaisList =
        caracterisAdicionaisRepository.findAll().stream()
            .map(caracterisAdicionais -> new CaracterisAdicionaisDTO(caracterisAdicionais))
            .collect(Collectors.toList());
    return new ResponseEntity<>(caracterisAdicionaisList, HttpStatus.OK);
  }

  @GetMapping(path = {"/{id}"})
  public ResponseEntity<CaracterisAdicionaisDTO> findById(@PathVariable Long id) {
    return caracterisAdicionaisRepository
        .findById(id)
        .map(record -> ResponseEntity.ok().body(new CaracterisAdicionaisDTO(record)))
        .orElse(ResponseEntity.notFound().build());
  }

  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> delete(@PathVariable Long id) {
    return caracterisAdicionaisRepository
        .findById(id)
        .map(
            record -> {
              caracterisAdicionaisRepository.deleteById(id);
              return ResponseEntity.ok().build();
            })
        .orElse(ResponseEntity.notFound().build());
  }
}

package com.facility;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<?> handle(
    RuntimeException ex,
    HttpServletRequest request,
    HttpServletResponse response
  ) {
    if (ex != null) {
      return ResponseEntity.internalServerError()
        .body("erro interno:\n" + ex.getMessage());
    }
    return ResponseEntity.internalServerError()
      .body("erro interno não reconhecido");
  }
}

package fr.marcof.enset_demo_spring_angular.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Student {
    @Id
    private String id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String code;
    private String programId;
    private String photo;
}

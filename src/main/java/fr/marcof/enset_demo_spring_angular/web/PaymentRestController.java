package fr.marcof.enset_demo_spring_angular.web;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.marcof.enset_demo_spring_angular.dto.NewPaymentDTO;
import fr.marcof.enset_demo_spring_angular.entities.Payment;
import fr.marcof.enset_demo_spring_angular.entities.PaymentStatus;
import fr.marcof.enset_demo_spring_angular.entities.PaymentType;
import fr.marcof.enset_demo_spring_angular.entities.Student;
import fr.marcof.enset_demo_spring_angular.repository.PaymentRepository;
import fr.marcof.enset_demo_spring_angular.repository.StudentRepository;
import fr.marcof.enset_demo_spring_angular.service.PaymentService;

@RestController
@CrossOrigin("*")
public class PaymentRestController {
    private final StudentRepository studentRepository;
    private final PaymentRepository paymentRepository;
    private final PaymentService paymentService;

    public PaymentRestController(StudentRepository studentRepository, PaymentRepository paymentRepository, PaymentService paymentService){
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
    }
    @GetMapping("/payments")
    public List<Payment> getPayments(){
        return this.paymentRepository.findAll();
    }

    @GetMapping("/payment/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return this.paymentRepository.findById(id)
                .orElseThrow();
    }

    @GetMapping("/students/{code}/payments")
    public List<Payment> paymentsByStudentCode(@PathVariable String code){
        return this.paymentRepository.findByStudentCode(code);
    }

    @GetMapping("/payments/byStatus")
    public List<Payment> paymentsByStatus(@RequestParam PaymentStatus paymentStatus){
        return this.paymentRepository.findByStatus(paymentStatus);
    }

    @GetMapping("/payments/byType")
    public List<Payment> paymentsByType(@RequestParam PaymentType paymentType){
        return this.paymentRepository.findByType(paymentType);
    }

    @GetMapping(value = "/paymentFile/{paymentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        return this.paymentService.getPaymentFile(paymentId);
    }
    
    @GetMapping("/students")
    public List<Student> allStudents(){
        return this.studentRepository.findAll();
    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
        return this.studentRepository.findByCode(code);
    }

    @GetMapping("/studentsByProgram")
    public List<Student> getStudentsByProgramId(@RequestParam String programId){
        return this.studentRepository.findByProgramId(programId);
    }

    @PutMapping("/payments/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status, @PathVariable Long id)
    throws IOException{
        return this.paymentService.updatePaymentStatus(status, id);
    }

    @PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam("file") MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        return this.paymentService.savePayment(file, newPaymentDTO);
    }


}

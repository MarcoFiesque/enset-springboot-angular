package fr.marcof.enset_demo_spring_angular.web;

import fr.marcof.enset_demo_spring_angular.entities.Payment;
import fr.marcof.enset_demo_spring_angular.entities.PaymentStatus;
import fr.marcof.enset_demo_spring_angular.entities.PaymentType;
import fr.marcof.enset_demo_spring_angular.entities.Student;
import fr.marcof.enset_demo_spring_angular.repository.PaymentRepository;
import fr.marcof.enset_demo_spring_angular.repository.StudentRepository;
import fr.marcof.enset_demo_spring_angular.service.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

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
        return paymentRepository.findAll();
    }
    @GetMapping("/students/{code}/payments")
    public List<Payment> paymentsByStudentCode(@PathVariable String code){
        return paymentRepository.findByStudentCode(code);
    }
    @GetMapping("/payments/byStatus")
    public List<Payment> paymentsByStatus(@RequestParam PaymentStatus paymentStatus){
        return paymentRepository.findByStatus(paymentStatus);
    }
    @GetMapping("/payments/byType")
    public List<Payment> paymentsByType(@RequestParam PaymentType paymentType){
        return paymentRepository.findByType(paymentType);
    }
    @GetMapping("/payment/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return paymentRepository.findById(id)
                .orElseThrow();
    }
    @GetMapping("/students")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }

    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
        return studentRepository.findByCode(code);
    }

    @GetMapping("/studentsByProgram")
    public List<Student> getStudentsByProgramId(@RequestParam String programId){
        return studentRepository.findByProgramId(programId);
    }

    @PutMapping("/payments/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status, @PathVariable Long id)
    throws IOException{
        return paymentService.updatePaymentStatus(status, id);
    }

    @PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam MultipartFile file, LocalDate date, double amount, PaymentType type, String studentCode) throws IOException {
        return this.paymentService.savePayment(file, date, amount, type, studentCode);
    }

    @GetMapping(value = "/paymentFile/{paymentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        return this.paymentService.getPaymentFile(paymentId);
    }

}

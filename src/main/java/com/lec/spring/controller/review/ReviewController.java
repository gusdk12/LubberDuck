package com.lec.spring.controller.review;

import com.lec.spring.domain.review.Review;
import com.lec.spring.service.review.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    public ReviewController(){}

    @GetMapping("/write")
    public void write(){}

    @PostMapping("/write")
    public String writeOk(@Validated Review review
            , BindingResult result
            , Model model
            , RedirectAttributes redirectAttrs){
        if(result.hasErrors()){
            redirectAttrs.addFlashAttribute("item_id", review.getItem_id());
            redirectAttrs.addFlashAttribute("rate", review.getRate());
            redirectAttrs.addFlashAttribute("content", review.getContent());
            redirectAttrs.addFlashAttribute("regdate", review.getRegDate());

            List<FieldError> errList = result.getFieldErrors();
            for(FieldError err : errList){
                redirectAttrs.addFlashAttribute("error_" + err.getField(), err.getCode());
            }

            return "redirect:/review/write";
        }
        model.addAttribute("result", reviewService.write(review));
        return "review/writeOk";
    }

    @GetMapping("/detail/{id}")
    public String detail(@PathVariable Long id, Model model){
        model.addAttribute("review", reviewService.detail(id));
        return "review/detail";
    }

    @GetMapping("/list")
    public void list(Model model){
        model.addAttribute("list", reviewService.list());

    }

    @GetMapping("/update/{id}")
    public String update(@PathVariable Long id, Model model){
        model.addAttribute("review", reviewService.selectById(id));
        return "review/update";
    }

    @PostMapping("/update")
    public String updateOk(@Validated Review review
            , BindingResult result
            , Model model
            , RedirectAttributes redirectAttrs
    ){

        if(result.hasErrors()){
            redirectAttrs.addFlashAttribute("item_id", review.getItem_id());
            redirectAttrs.addFlashAttribute("rate", review.getRate());
            redirectAttrs.addFlashAttribute("content", review.getContent());
            redirectAttrs.addFlashAttribute("regdate", review.getRegDate());

            List<FieldError> errList = result.getFieldErrors();
            for(FieldError err : errList){
                redirectAttrs.addFlashAttribute("error_" + err.getField(), err.getCode());
            }

            return "redirect:/review/update/" + review.getId();
        }
        model.addAttribute("result", reviewService.update(review));
        return "review/updateOk";
    }

    @PostMapping("/delete")
    public String deleteOk(Long id, Model model){
        model.addAttribute("result", reviewService.deleteById(id));
        return "review/deleteOk";
    }

//    @InitBinder
//    public void initBinder(WebDataBinder binder){
//        System.out.println("ReviewController.initBinder() 호출");
//        binder.setValidator(new ReviewValidator());
//    }
}

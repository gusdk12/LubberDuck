package com.lec.spring.domain.recent;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.lec.spring.domain.menu.Menu;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recent {
    private Long user_id; // 해당 유저 (PK)
    private Long menu_id; // (PK)

    @ToString.Exclude
    private Menu menu; //칵테일 아이디 (FK)

    // java.time.* 객체 변환을 위한 annotation
    @JsonDeserialize(using= LocalDateTimeDeserializer.class)
    @JsonSerialize(using= LocalDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
    @JsonProperty("saw_date") // 변환하고자 하는 형태 지정 가능
    private LocalDateTime sawDate; // 상품 본 날짜시간
}

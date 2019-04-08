/// <reference types="react" />
export declare const user_basic_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): "是" | "否";
})[];
export declare const iou_statistic_config: {
    attr: string;
    text: string;
}[];
export declare const user_gray_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): JSX.Element | {
        data: any;
    };
} | {
    attr: string;
    text: string;
    format(data: any): "是" | "否";
})[];
export declare const contacts_number_statistic_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): any;
})[];
export declare const contacts_rfm_config: ({
    attr: string;
    text: string;
    format(data: any): string;
} | {
    attr: string;
    text: string;
})[];
export declare const contacts_closest_config: {
    attr: string;
    text: string;
}[];
export declare const contacts_gray_score_config: {
    attr: string;
    text: string;
}[];
export declare const contacts_query_config: ({
    attr: string;
    text: string;
    format(data: any): string;
} | {
    attr: string;
    text: string;
})[];
export declare const register_orgs_statistics_config: {
    attr: string;
    text: string;
}[];
export declare const user_register_orgs_config: {
    attr: string;
    text: string;
}[];
export declare const blacklist_details_config: {
    attr: string;
    text: string;
}[];
export declare const user_blacklist_config: ({
    attr: string;
    text: string;
    format(data: any): "是" | "否";
} | {
    attr: string;
    text: string;
    format(data: any): JSX.Element;
} | {
    attr: string;
    text: string;
})[];
export declare const phone_with_other_idcards_config: {
    attr: string;
    text: string;
}[];
export declare const phone_with_other_names_config: {
    attr: string;
    text: string;
}[];
export declare const phone_applied_in_orgs_config: {
    attr: string;
    text: string;
}[];
export declare const idcard_with_other_names_config: {
    attr: string;
    text: string;
}[];
export declare const idcard_with_other_phones_config: {
    attr: string;
    text: string;
}[];
export declare const idcard_applied_in_orgs_config: {
    attr: string;
    text: string;
}[];
export declare const user_searched_history_by_orgs_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): "是" | "否";
})[];
export declare const user_batch_searched_history_by_orgs_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): "是" | "否";
})[];
export declare const consumer_label_config: {
    attr: string;
    text: string;
}[];
export declare const user_searched_history_by_day_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): string;
})[];
export declare const user_searched_history_by_day_array_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): string;
})[];
export declare const user_searched_history_by_day_percent_array_config: ({
    attr: string;
    text: string;
} | {
    attr: string;
    text: string;
    format(data: any): string;
})[];

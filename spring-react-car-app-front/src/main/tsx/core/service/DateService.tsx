

class DateService {

    static FIXED_DATE: Date = null;

    static now(): Date {
        return DateService.FIXED_DATE ? DateService.FIXED_DATE : new Date();
    }

}

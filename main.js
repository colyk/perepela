$(function() {
  let yearDayCount = 365;
  let monthDayCount = 30;

  let euro = 0.033;

  let $eggValue = $('.egg_value');
  let $boxValue = $('.box_value');
  let $boxEggCount = $('.box_egg_count');
  let $perepCount = $('.perep_count');
  let $feedConsumption = $('.feed_consumption');
  let $feedPrice = $('.feed_price');
  let $waterConsumption = $('.water_consumption');
  let $waterPrice = $('.water_price');
  let $period = $('.egg_in_year');


  function toKg(val) {
    return val / 1000;
  }

  function formatPrice(val) {
    return new Intl.NumberFormat('ua-UA', { style: 'currency', currency: 'UAH' }).format(val).slice(0, -5);
  }

  function formatKgPrice(val) {
    return formatPrice(toKg(val));
  }

  function onCalcClick() {
    let perepCount = $perepCount.val();

    let eggsPerDay = $period.val() / yearDayCount;
    let eggsInMonthPerPerep = eggsPerDay * monthDayCount;
    let eggsInMonth = eggsInMonthPerPerep * perepCount;

    let monthFeedConsumptionPerPerep = monthDayCount * $feedConsumption.val();

    $('.costs__month_feed_consumption').text(toKg(monthFeedConsumptionPerPerep * perepCount));
    $('.costs__month_feed_consumption_per_perep').text(toKg(monthFeedConsumptionPerPerep));
    $('.costs__month_feed_price').text(formatKgPrice(monthFeedConsumptionPerPerep * $feedPrice.val() * perepCount));

    let monthWaterConsumptionPerPerep = monthDayCount * $waterConsumption.val();
    $('.costs__month_water_consumption').text(toKg(monthWaterConsumptionPerPerep * perepCount));
    $('.costs__month_water_consumption_per_perep').text(toKg(monthWaterConsumptionPerPerep));
    $('.costs__month_water_price').text(formatKgPrice(monthWaterConsumptionPerPerep * $waterPrice.val() * perepCount));

    let needBoxes = Math.ceil(eggsInMonth / $boxEggCount.val());
    $('.costs__box_count').text(needBoxes);
    $('.costs__box_price').text(formatPrice(needBoxes * $boxValue.val()));


    $('.income__egg_in_month').text(Math.ceil(eggsInMonth));
    let eggsIncome = $eggValue.val() * Math.ceil(eggsInMonth) - needBoxes * $boxValue.val();
    $('.income__egg_in_month_price').text(formatPrice(eggsIncome));

    let income = eggsIncome - monthWaterConsumptionPerPerep * $waterPrice.val() * perepCount / 1000 - monthFeedConsumptionPerPerep * $feedPrice.val() * perepCount / 1000;
    $('.income').text(formatPrice(income));
    $('.income__euro').text(formatPrice(income * euro));
  }

  $('.calc-btn').click(onCalcClick);
  onCalcClick();
});
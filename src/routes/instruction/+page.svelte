<script lang="js">
  import { publicApi } from "$lib/api";
  import { Button } from "$lib/components/ui/button/index.js";
  import Link from "../../common/link.svelte";

  import { PUBLIC_BASE_URL } from "$env/static/public";

  let isDownloading = false;

  async function handleDownload(event) {
    event.preventDefault();

    try {
      isDownloading = true;

      const response = await publicApi.get(
        PUBLIC_BASE_URL + "/public/download/example",
        {
          isFile: true,
        }
      );

      const url = window.URL.createObjectURL(response);

      const link = document.createElement("a");
      link.href = url;

      const filename = "მაგალითი.docx";

      link.download = filename;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error", error);
    } finally {
      isDownloading = false;
    }
  }
</script>

<div
  class="flex relative justify-center items-center flex-col gap-8 p-5 border-l-indigo-500 w-full mb-8"
>
  <h4
    class="md:text-2xl text-lg align-middle text-center text-black mt-3 font-bold"
  >
    ინსტრუქცია
  </h4>

  <div class="flex w-full text-center items-center justify-between gap-2">
    <Link visited="visited:text-purple-400" href="/upload">ატვირთვა</Link>
    <Button
      class="cursor-pointer"
      on:click={handleDownload}
      disabled={isDownloading}
    >
      {#if isDownloading}
        მაგალითი...
      {:else}
        მაგალითი
      {/if}
    </Button>
  </div>

  <p class="text-lg w-full">
    ინსტრუქციის უკეთ გასაგებად გთხოვთ წაკითხვის შემდეგ <button
      on:click={handleDownload}
      class="font-bold cursor-pointer text-blue-600">გადმოწეროთ</button
    > მაგალითი ფაილი.
  </p>

  <p class="text-lg w-full">
    ფაილის ასატვრირთად აუცილებელია იყოთ დალოგინებული.
  </p>

  <p class="text-lg w-full">ფაილი უნდა იყოს doc, docx ფორმატის.</p>

  <div class="text-lg w-full flex flex-col gap-2">
    <p>ტურნირის შესახებ ინფორმაცია უნდა იყოს შემდეგი ფორმატის:</p>

    <p><strong>tour_name:</strong> სახელი</p>
    <p><strong>tour_author:</strong> ავტორი1, ავტორი2, ავტორი3</p>
    <p><strong>tour_date:</strong> 2024-03-10</p>

    <p class="text-sm mt-2">
      * - ამ ეტაპზე სამწუხაროდ ვერ მოხერხდა ტესტერების შესახებ ინორმაციის
      დამატება. გთხოვთ ეს ინფორმაცია ამოიღოთ ფაილიდან.

      <br />
      * - ასევე განსაკუთრებული ყურადღება მიაქციეთ იმას, რომ ქივორდები როგორიც არის
      მაგალითად (tour_name:) სწორად იყოს. არ გამოგრჩეთ ორწერტილი.
      <br />
      * - ავტორების სია გამოყავით მძიმით (,).
      <br />
      * - ტურნირის ჩატარების თარიღის ფორმატი უნდა იყოს ისე როგორც მაგალითშია.
    </p>
  </div>

  <div class="text-lg w-full flex flex-col gap-2">
    <p>კითხვა უნდა იყოს შემდეგი ფორმატის:</p>

    <p><strong>tour_question: 1.</strong> შეკითხვის ძირითადი ნაწილი</p>
    <p class="text-sm mt-2 align-middle">
      * - ეს ნაწილია აუცილებალია - ქივორდი, შემდეგ ორწერტილი, კითხვის ნომერი,
      წერტილი.
      <br />
      * - თუ კითხვას აქვს დასარიგებელი მასალა და ეს მასალა არის ფოტო. გთხოვთ მასალას
      წინ მიუწეროთ ეს ქივორდი - <strong>additional_resource:</strong> (ტექსტური
      ტიპის მასალაზე ეს ქივორდი არ არის საჭირო).
      <br />
      * - თუ გინდათ რომ კითხვის რაღაც ნაწილი დაიწყოს ახალი ხაზიდან (მაგალითად ლექსია
      და გინდათ ხაზები გამოყოფილი იყოს) იმ ნაწილს რომლის ახალი ხაზიდან დაწყებაც გინდათ
      წინ დაუსწერეთ ეს - <strong>\n</strong>
      <br />
      * - დუპლეტისა და მასალიანი კითხვის მაგალითები იხილეთ ქვემოთ
    </p>
    <p><strong>question_answer:</strong> პასუხი</p>
    <p class="text-sm mt-2">
      * - თუ კითხვას აქვს ჩათვლაც, ჩათვლის ნაწილიც ქივოდის შემდეგ უნდა მოდიოდეს
    </p>
    <p><strong>question_comment:</strong> კომენტარი</p>
    <p class="text-sm mt-2">
      * - გთხოვთ აუცილებლად მიუთითეთ კომენტარის ნაწილი. თუ კითხვას კომენტარი არ
      აქვს, question_comment: ეს ნაწილი დატოვეთ მხოლოდ.
    </p>
    <p><strong>question_source:</strong> წყაროების სია</p>
    <p class="text-sm mt-2">
      * - რამდენიმე მნიშვნელოვანი შენიშვნა წყაროებთან დაკავშირებით:

      <br />
      * - თუ წყარო არის ლინკი და არა ტექსტი, მიუთითეთ პირდაპირ ლინკი და არა მაგალითი
      "წყარო", ან "ბმული".
      <br />
      * - თუ წყარო არის ლინკი წინ დაუწერეთ src_link:
      <br />
      * - არ დანომროთ წყაროები. წყაროები ერთმანეთისგან გამოყავით ამ სიმბოლოთი.
      <strong>\n</strong>
      <br />
      * - წყაროს მაგალითი: "question_source: ირაკლი მახარაძე „დიადი მუნჯი“ \n src_link:
      https://www.live.ge/fexburti/pirveli-mertskhlis-alegoria/ "
    </p>
    <p><strong>question_author:</strong> ავტორების სია</p>
    <p class="text-sm mt-2">
      * - ავტორების სია გამოყავით მძიმით (,).
      <br />
      აუცილებლად მიუთითეთ ავტორ(ებ)ი
    </p>

    <p class="text-sm mt-2"></p>
  </div>

  <div class="text-lg w-full flex flex-col gap-2 mt-3">
    <p>შეკითხვის მაგალითი:</p>
    <p>
      tour_question: 12. ერთი წიგნის გმირი სკოლაში შესვლას ენთუზიაზმით არ ხვდება
      და ამბობს, რომ სკოლაში შესვლით იწყება იქსი. ერთი წყაროს თანახმად “იქსის”
      ადაპტაციით 1960-იან წლებში სტენლი კუბრიკი იყო დაინტერესებული. ყურადღება,
      შეკითხვა: დაასახელეთ იქსი ორი სიტყვით. <br /> question_answer: ბავშვობის
      დასასრული.
      <br /> question_comment: პერსონაჟის თქმით სკოლაში შესვლით უდარდელი
      ბავშვობა მთავრდება. სტენლი კუბრიკი 1960-იან წლებში არტურ კლარკის
      ნაწარმოების “ბავშვობის დასასულის” ადაპტაციას აპირებდა, თუმცა საბოლოოდ
      რეჟისორმა კლარკის სხვა ნაწარმოებზე შეაჩერა არჩევანი. <br />
      question_source: “ჩემი წუთისოფელი” - ვახუშტი კოტეტიშვილი \n src_link: https://en.wikipedia.org/wiki/Childhood%27s_End#cite_note-Baxter-27
      <br /> question_author: შანშე ქენქაძე.
    </p>
  </div>

  <div class="text-lg w-full flex flex-col gap-2 mt-3">
    <p>დუპლეტის მაგალითი:</p>
    <p>
      tour_question: 13. დუპლეტი: \n <br />1. პირველი კითხვა \n <br />2. მეორე
      კითხვა.
      <br /> question_answer: 1. პასუხი1 2. პასუხი2
      <br /> question_comment: კომენტარი <br />
      question_source: წყარო
      <br /> question_author: ავტორი
    </p>
  </div>

  <div class="text-lg w-full flex flex-col gap-2 mt-3">
    <p>მასალიანი შეკითხვის მაგალითი:</p>
    <p>
      tour_question: 14. . დასარიგებელი მასალა: \n additional_resource: [ფოტო]
      \n შეკითხვის ძირითადი ნაწილი
      <br /> question_answer: პასუხი
      <br /> question_comment: კომენტარი <br />
      question_source: წყარო
      <br /> question_author: ავტორი
    </p>
  </div>
</div>

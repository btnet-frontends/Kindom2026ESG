<script setup>
    import { ref,onMounted } from 'vue'

    import AOS from 'aos'
    import 'aos/dist/aos.css'


  const withBase = (p) => (p?.startsWith('/') ? import.meta.env.BASE_URL + p.slice(1) : p)

  defineProps({
    infoData: Object
  });

   onMounted(() => {
        AOS.init()
    });

    const form = ref({
        Name: '',
        Cell_phone: '',
        Email: '',
        Gender: '',
        Age: '',
        Industry: '',
        ServiceUnit: '',
        Job_Title: '',
        Privacy_consent: false
    })

    const mobileRegex = /^09\d{8}$/
    const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    const nameRegex = /^.{2,30}$/

    function checkVal() {
        if (!form.value.Name) {
            alert('請輸入姓名');
            return;
        } else if (!nameRegex.test(form.value.Name)) {
            alert('姓名長度請輸入2~30字');
            return;
        } else if (!form.value.Cell_phone) {
            alert('請輸入聯絡手機');
            return;
        } else if (!mobileRegex.test(form.value.Cell_phone)) {
            alert('請輸入包含09開頭之連續10碼阿拉伯數字');
            return;
        } else if (!form.value.Email) {
            alert('請輸入Email');
            return;
        } else if (!emailRegex.test(form.value.Email)) {
            alert('請填寫正確電子郵件');
            return;
        } else if (!form.value.Gender) {
            alert('請選擇性別');
            return;
        } else if (!form.value.Age) {
            alert('請選擇年齡');
            return;
        } else if (!form.value.Industry) {
            alert('請選擇產業別');
            return;
        } else if (!form.value.ServiceUnit) {
            alert('請輸入服務單位');
            return;
        } else if (!form.value.Job_Title) {
            alert('請輸入職稱');
            return;
        }  else if (form.value.Privacy_consent == false) {
            alert('請同意個資告知事項');
            return;
        } 

        sign_up();

    }

    function sign_up() {
        const data = new FormData();

        const url = 'https://events.businesstoday.com.tw/backend/SustainableLivingSurveyForum2026/sign_up?v=' + new Date().getTime();

        for (const key in form.value) {
            data.append(key, form.value[key]);
        }


        fetch(url, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(response => {
            if (response['bIsSuccess'] == "0") {
                alert(response['sError'])
            } else {
                alert("本會議為審核制，後續將以簡訊、e-mail通知您是否報名成功，如未收到代表未報名成功。")
                location.href = "./index.html"
            }
            })
            .catch(() => {
            alert("系統忙碌中，請稍後再試！")
            })
    }

</script>

<template>
    <div class="content_wrap relative z-10">
        <div class="sec_title_group flex flex-col items-center justify-center text-center mt-8 sm:mt-10 translate-y-[6px] relative select-none">
            <h2 class="sec_title_zh text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#01989f] tracking-wide relative z-10 m-0">
                {{ infoData.title || '立即報名' }}
            </h2>
            <span class="sec_title_en text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-wider leading-none opacity-90 mt-1 sm:mt-1 md:mt-2 relative z-0">
                {{ infoData.titleEn || 'SIGN UP' }}
            </span>
        </div>
<div class="signUp_box max-w-[1200px] p-6 sm:p-10 mx-4 sm:mx-5 xl:mx-auto bg-white rounded-lg shadow-lg">
            <form class="flex flex-col gap-6 w-full" @submit.prevent="checkVal">
<div class="flex flex-col sm:grid sm:grid-cols-2 gap-x-8 gap-y-6 w-full">
    <div v-for="(item, idx) in infoData.label" :key="idx" class="flex flex-col w-full sm:flex-row items-center gap-2">
        <label class="w-full text-black text-lg shrink-0 form_label sm:w-24">{{ item.tagName }}</label>

        <input v-if="item.type !== 'select'" v-model="form[item.inputName]" :name="item.inputName" :type="item.type" :min="item.type === 'number' ? 0 : undefined" :maxlength="item.inputName === 'Cell_phone' ? 10 : undefined" :placeholder="item.placeholder" class="w-full flex-1 p-2 bg-white text-black border border-gray-300 focus:outline-none placeholder-[#999999]" />
        
        <select
            v-else
            v-model="form[item.inputName]"
            :name="item.inputName"
            :style="{ color: form[item.inputName] === '' ? '#999999' : '#000' }"
            class="w-full flex-1 p-2 bg-white border border-gray-300 focus:outline-none"
        >
            <option
                v-for="(opt, idx) in item.option"
                :key="idx"
                :value="opt.value"
                :disabled="opt.value === ''"
                :hidden="opt.value === ''"
                style="color: #000;"
            >
                {{ opt.optionName }}
            </option>
        </select>
    </div>
</div>
                <div class="flex flex-col gap-4 mt-2 p-5 bg-[#e6e6e6] rounded-md">
                    <div class="text-base text-neutral-600 leading-relaxed text-justify flex flex-col gap-3">
                        <p v-html="infoData.announce.detail"></p>
                    </div>
                    <div class="flex items-center justify-center gap-2 py-2">
                        <input v-model="form.Privacy_consent" type="checkbox" id="agree" class="w-4 h-4 cursor-pointer" />
                        <label for="agree" class="text-black text-lg font-bold cursor-pointer select-none">
                            {{infoData.announce.text}}
                        </label>
                    </div>
                </div>
                <button type="submit" class="w-fit mx-auto mt-4 p-3 transition hover:cursor-pointer">
                    <img :src="withBase('sign_up_btn.png')" class="w-[15rem]" alt="sign_up_btn">
                </button>
            </form>
        </div>
    </div>

</template>

<style scoped>
    .form_label::before{
        content:'*';
        color: red;
        margin-left: 0.25rem;
        margin-right: 0.25rem;
    }
    button:hover{
        cursor: pointer;
        opacity: 0.8;
    }
</style>
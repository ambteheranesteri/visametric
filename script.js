import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// --- تنظیمات Supabase ---
const supabaseUrl = 'https://YOUR_PROJECT_ID.supabase.co'
const supabaseKey = 'YOUR_ANON_KEY'
const supabase = createClient(supabaseUrl, supabaseKey)

// --- عناصر DOM ---
const loginForm = document.getElementById('login-form')
const ceuInput = document.getElementById('ceu-number')
const idInput = document.getElementById('national-id')
const loginError = document.getElementById('login-error')
const dashboard = document.getElementById('dashboard-layout')
const loginPage = document.getElementById('login-page')
const applicantNameEl = document.getElementById('applicant-name')
const applicantCeuEl = document.getElementById('applicant-ceu')
const logoutBtn = document.getElementById('logout-btn')

// --- Login ---
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    loginError.classList.add('hidden')

    const ceu = ceuInput.value.trim()
    const nationalId = idInput.value.trim()

    if (!ceu || !nationalId) return alert('لطفا هر دو فیلد را وارد کنید.')

    const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .eq('ceu_number', ceu)
        .eq('national_id', nationalId)
        .single()

    if (error || !data) {
        loginError.classList.remove('hidden')
        return
    }

    // نمایش داشبورد
    applicantNameEl.textContent = data.name + ' ' + data.last_name
    applicantCeuEl.textContent = data.ceu_number
    loginPage.classList.add('hidden')
    dashboard.classList.remove('hidden')
})

// --- Logout ---
logoutBtn.addEventListener('click', () => {
    ceuInput.value = ''
    idInput.value = ''
    loginPage.classList.remove('hidden')
    dashboard.classList.add('hidden')
})

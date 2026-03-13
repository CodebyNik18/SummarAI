// let resendInterval = null;

// // ── Show / hide alerts ──
// function err(id, msgId, msg) { const el = document.getElementById(id); el.className = 'alert alert-error show'; document.getElementById(msgId).textContent = msg; }
// function suc(id, msgId, msg) { const el = document.getElementById(id); el.className = 'alert alert-success show'; document.getElementById(msgId).textContent = msg; }
// function clearAlert(id) { document.getElementById(id).classList.remove('show'); }

// // ── Step navigation ──
// function goTo(n) {
//     [1, 2, 3].forEach(i => document.getElementById('step' + i).classList.toggle('active', i === n));
//     [1, 2, 3].forEach(i => {
//         const c = document.getElementById('sc' + i), l = document.getElementById('sl' + i);
//         c.classList.remove('active', 'done');
//         l.classList.remove('active');
//         if (i < n) c.classList.add('done'), c.textContent = '✓';
//         else if (i === n) { c.classList.add('active'); if (i < n) c.textContent = i; else c.textContent = i; l.classList.add('active'); }
//         else c.textContent = i;
//     });
//     [1, 2].forEach(i => document.getElementById('conn' + i).classList.toggle('done', i < n));
//     ['d1', 'd2', 'd3'].forEach((id, idx) => {
//         const el = document.getElementById(id);
//         el.classList.remove('visible');
//         if (idx + 1 === n) { el.classList.add('visible'); }
//     });
//     if (n === 2) setTimeout(() => document.getElementById('ob0').focus(), 350);
// }

// // ── Send OTP ──
// async function sendOtp() {
//     const email = document.getElementById('email').value.trim();
//     if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         document.getElementById('email').classList.add('error-input');
//         err('a1', 'a1m', 'Enter a valid email address before sending OTP.');
//         setTimeout(() => document.getElementById('email').classList.remove('error-input'), 1800);
//         return;
//     }
//     clearAlert('a1'); clearAlert('a1s');
//     const btn = document.getElementById('btnSendOtp');
//     btn.disabled = true;
//     btn.innerHTML = '<div class="spinner"></div>';

//     try {
//         const res = await fetch('/api/send-otp/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
//         const data = await res.json();
//         if (res.ok) {
//             btn.innerHTML = '✓ Sent';
//             btn.classList.add('sent');
//             document.getElementById('otpSentInfo').classList.add('show');
//             suc('a1s', 'a1sm', 'OTP sent to ' + email);
//             setTimeout(() => { btn.innerHTML = 'Resend'; btn.classList.remove('sent'); btn.disabled = false; }, 30000);
//         } else {
//             btn.innerHTML = 'Send OTP'; btn.disabled = false;
//             err('a1', 'a1m', data.message || 'Could not send OTP. Please try again.');
//         }
//     } catch (e) {
//         btn.innerHTML = 'Send OTP'; btn.disabled = false;
//         err('a1', 'a1m', 'Network error. Check your connection.');
//     }
// }

// // ── Validate Step 1 & move to step 2 ──
// function continueStep() {
//     const fn = document.getElementById('firstname').value.trim();
//     const ln = document.getElementById('lastname').value.trim();
//     const em = document.getElementById('email').value.trim();
//     const un = document.getElementById('username').value.trim();
//     const pw = document.getElementById('password').value;
//     const p2 = document.getElementById('password2').value;
//     const tc = document.getElementById('terms').checked;

//     if (!fn || !ln) { err('a1', 'a1m', 'Please enter your first and last name.'); return; }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { err('a1', 'a1m', 'Enter a valid email address.'); return; }
//     if (!un) { err('a1', 'a1m', 'Please choose a username.'); return; }
//     if (pw.length < 8) { err('a1', 'a1m', 'Password must be at least 8 characters.'); return; }
//     if (pw !== p2) { err('a1', 'a1m', 'Passwords do not match.'); return; }
//     if (!tc) { err('a1', 'a1m', 'You must agree to the Terms of Service.'); return; }

//     clearAlert('a1'); clearAlert('a1s');
//     document.getElementById('otpEmailShow').textContent = em;
//     document.getElementById('successEmail').textContent = em;

//     // Send OTP automatically when continuing if not already sent
//     sendOtpOnContinue(em);

//     goTo(2);
//     startTimer();
// }

// async function sendOtpOnContinue(email) {
//     try { await fetch('/api/send-otp/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }); } catch (e) { }
// }

// // ── Timer ──
// function startTimer() {
//     let s = 60;
//     document.getElementById('timerNum').textContent = s;
//     document.getElementById('resendBtn').disabled = true;
//     document.getElementById('resendTimer').style.display = 'inline';
//     clearInterval(resendInterval);
//     resendInterval = setInterval(() => {
//         s--;
//         document.getElementById('timerNum').textContent = s;
//         if (s <= 0) { clearInterval(resendInterval); document.getElementById('resendBtn').disabled = false; document.getElementById('resendTimer').style.display = 'none'; }
//     }, 1000);
// }

// async function resendOtp() {
//     const email = document.getElementById('email').value.trim();
//     document.getElementById('resendBtn').disabled = true;
//     try {
//         const res = await fetch('/api/send-otp/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
//         if (res.ok) { clearAlert('a2'); clearOtp(); startTimer(); }
//         else { err('a2', 'a2m', 'Could not resend OTP.'); document.getElementById('resendBtn').disabled = false; }
//     } catch (e) { err('a2', 'a2m', 'Network error.'); document.getElementById('resendBtn').disabled = false; }
// }

// // ── OTP boxes ──
// function clearOtp() {
//     for (let i = 0; i < 6; i++) { const b = document.getElementById('ob' + i); b.value = ''; b.classList.remove('filled', 'error-box'); }
//     document.getElementById('ob0').focus();
// }

// function getOtp() { let c = ''; for (let i = 0; i < 6; i++) c += document.getElementById('ob' + i).value; return c; }

// function shakeOtp() {
//     for (let i = 0; i < 6; i++) {
//         const b = document.getElementById('ob' + i);
//         b.classList.add('error-box'); b.classList.remove('filled');
//         setTimeout(() => b.classList.remove('error-box'), 500);
//     }
//     setTimeout(clearOtp, 600);
// }

// document.addEventListener('DOMContentLoaded', () => {
//     for (let i = 0; i < 6; i++) {
//         const box = document.getElementById('ob' + i);
//         box.addEventListener('input', e => {
//             const v = e.target.value.replace(/\D/g, '');
//             box.value = v ? v[0] : '';
//             box.classList.toggle('filled', !!box.value);
//             if (box.value && i < 5) document.getElementById('ob' + (i + 1)).focus();
//             if (getOtp().length === 6) setTimeout(verifyOtp, 180);
//         });
//         box.addEventListener('keydown', e => {
//             if (e.key === 'Backspace' && !box.value && i > 0) document.getElementById('ob' + (i - 1)).focus();
//             if (e.key === 'ArrowLeft' && i > 0) document.getElementById('ob' + (i - 1)).focus();
//             if (e.key === 'ArrowRight' && i < 5) document.getElementById('ob' + (i + 1)).focus();
//         });
//         box.addEventListener('paste', e => {
//             e.preventDefault();
//             const p = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
//             for (let j = 0; j < p.length; j++) { const t = document.getElementById('ob' + j); if (t) { t.value = p[j]; t.classList.add('filled'); } }
//             document.getElementById('ob' + Math.min(p.length, 5)).focus();
//             if (p.length === 6) setTimeout(verifyOtp, 180);
//         });
//     }
// });

// // ── Verify OTP + Register ──
// async function verifyOtp() {
//     const code = getOtp();
//     if (code.length < 6) { err('a2', 'a2m', 'Enter all 6 digits.'); return; }

//     clearAlert('a2');
//     const btn = document.getElementById('btnVerify');
//     btn.disabled = true;
//     btn.innerHTML = '<div class="spinner"></div><span>Verifying…</span>';

//     const email = document.getElementById('email').value.trim();
//     const body = {
//         email,
//         otp: code,
//         first_name: document.getElementById('firstname').value.trim(),
//         last_name: document.getElementById('lastname').value.trim(),
//         username: document.getElementById('username').value.trim(),
//         password: document.getElementById('password').value
//     };

//     try {
//         // ── Call your verify-otp API ──
//         const vRes = await fetch('/api/verify-otp/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp: code }) });
//         const vData = await vRes.json();
//         if (!vRes.ok) { shakeOtp(); err('a2', 'a2m', vData.message || 'Invalid or expired OTP.'); btn.disabled = false; btn.innerHTML = '<span>Verify &amp; create account</span><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'; return; }

//         // ── Call your register API ──
//         const rRes = await fetch('/api/register/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
//         const rData = await rRes.json();
//         if (rRes.ok) {
//             clearInterval(resendInterval);
//             goTo(3);
//         } else {
//             err('a2', 'a2m', rData.message || 'Registration failed. Please go back and try again.');
//             btn.disabled = false;
//             btn.innerHTML = '<span>Verify &amp; create account</span><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
//         }
//     } catch (e) {
//         shakeOtp();
//         err('a2', 'a2m', 'Network error. Please try again.');
//         btn.disabled = false;
//         btn.innerHTML = '<span>Verify &amp; create account</span><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
//     }
// }

// // ── Helpers ──
// function togglePwd(id) { const i = document.getElementById(id); i.type = i.type === 'password' ? 'text' : 'password'; }

// function checkStrength(v) {
//     const segs = ['s1', 's2', 's3', 's4'].map(id => document.getElementById(id));
//     const lbl = document.getElementById('slbl');
//     const cols = ['#C94040', '#D4853A', '#D4C040', '#6B8F71'];
//     const labs = ['Too weak', 'Could be stronger', 'Almost there', 'Strong ✓'];
//     let sc = 0;
//     if (v.length >= 8) sc++; if (/[A-Z]/.test(v)) sc++; if (/[0-9]/.test(v)) sc++; if (/[^A-Za-z0-9]/.test(v)) sc++;
//     segs.forEach((s, i) => s.style.background = i < sc ? cols[Math.min(sc - 1, 3)] : 'var(--border)');
//     lbl.textContent = v.length === 0 ? 'Enter a password' : (labs[Math.min(sc - 1, 3)] || 'Too weak');
//     lbl.style.color = v.length === 0 ? 'var(--ink-muted)' : cols[Math.min(sc - 1, 3)];
// }
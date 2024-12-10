export const verificationTemplate = (
  name,
  url
) => `<div style="margin:5px auto; max-width: 768px; padding:5px;" >
    <div style="text-align: center; padding: 5px; width: 100%;">
  <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1732997580/logos/sfrttgj1lm0ssqg72zb8.png" alt="carhub logo" height="30" width="200" style="margin: 5px auto"/>
</div>
<h3>Email Verification</h3>
<p>Hi ${name},</p>
<p>You're almost set to start enjoying CarHub services. Simply click the link below to verify your email address and get started. 
</p>
<p>The link expires in 24 hours.</p>
  <a href="${url}" style="display:block; background-color:#22C55E; color:#fff; padding:10px 5px; border-radius:5px; text-align:center; width:50%; margin:10px auto; text-decoration:none;">Verify Email Address</a>
 <p>Once your email is verified, you can start setting up your account.  If you are having any issues with your account, please don't hesitate to <a title="contact" href="https://carhubke.vercel.app/help">contact us.</a></p>
 <small>This email is for information purposes only. Kindly do not reply to this email</small>
    <hr style="border-color: #22C55E"/>
    <footer style="font-size: 12px; padding: 5px; margin: 10px 0px; text-align:center; color: #22C55E">  
    <table align="center" style="margin: 10px auto;">
      <tr>
        <td style="padding: 0 5px;">
          <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" alt="Facebook" width="30" height="30" >
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://x.com/diamonddegesh" title="Twitter">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" alt="Twitter" width="30" >
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://instagram.com/Donvine254" title="instagram">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/instagram-logo-removebg-preview_jh0wxb.png" alt="instagram" width="30" height="30" >
          </a>
        </td>
      </tr>
    </table>
    <p style="font-weight:bold">123 Kimathi Street, Nairobi, Kenya</p>
    <p><a href="https://carhubke.vercel.app/privacy">Privacy Policy</a> | <a href="https://carhubke.vercel.app/help">Contact Details </a></p>
    </footer> 
  </div>`;

export const welcomeTemplate = (
  name,
  url
) => `<div style="margin:5px auto; max-width: 768px; padding:5px;" >
    <div style="text-align: center; padding: 5px; width: 100%;">
  <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1732997580/logos/sfrttgj1lm0ssqg72zb8.png" alt="carhub logo" height="30" width="200" style="margin: 5px auto"/>
</div>
 <img
        src="https://blog-assets.freshworks.com/live-chat-software/wp-content/uploads/2019/01/23194917/Welcome-abroad.jpg"
        style="width: 100%; max-height: 300px; margin: auto; border-radius:5px;" />
<h3 style="font-weight:bold;">Welcome to Carhub Kenya! Your Journey Begins Here 🚗✨</h3>
<p>Hi ${name},</p>
<p>Welcome to Carhub Kenya! We’re absolutely thrilled to have you on board. 🌟</p>

<p>At Carhub Kenya, we believe every journey should be as exciting as the destination. Whether you’re planning a weekend
getaway, a road trip, or just need a reliable ride, we’re here to make your experience seamless, fun, and unforgettable.</p>
 <a href="${url}" style="display:block; background-color:#22C55E; color:#fff; padding:10px 5px; border-radius:5px; text-align:center; width:50%; margin:10px auto; text-decoration:none;">Get Started</a>
<p>As a special welcome gift, we’re offering you 20% off your first booking! Simply use the code <strong>WELCOME20</strong> at checkout.</p>

<p>The road is calling, and we can’t wait to be part of your next adventure! If you have any questions or need assistance,
our team is always ready to help.</p>

<p>Happy travels,</p>
<p>The Carhub Kenya Team 🚘</p>
 <small>This email is for information purposes only. Kindly do not reply to this email</small>
    <hr style="border-color: #22C55E"/>
    <footer style="font-size: 12px; padding: 5px; margin: 10px 0px; text-align:center; color: #22C55E">  
    <table align="center" style="margin: 10px auto;">
      <tr>
        <td style="padding: 0 5px;">
          <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" alt="Facebook" width="30" height="30" >
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://x.com/diamonddegesh" title="Twitter">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" alt="Twitter" width="30" >
          </a>
        </td>
        <td style="padding: 0 5px;">
          <a href="https://instagram.com/Donvine254" title="instagram">
            <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/instagram-logo-removebg-preview_jh0wxb.png" alt="instagram" width="30" height="30" >
          </a>
        </td>
      </tr>
    </table>
    <p style="font-weight:bold">123 Kimathi Street, Nairobi, Kenya</p>
    <p><a href="https://carhubke.vercel.app/privacy">Privacy Policy</a> | <a href="https://carhubke.vercel.app/help">Contact Details </a></p>
    </footer> 
  </div>
`;
export const passwordResetTemplate = (
  name,
  url
) => `<body style="font-family: 'Inter', sans-serif;">
 <div style="margin:5px auto; max-width: 768px; padding:5px;" >
      <div style="text-align: center; padding: 5px; width: 100%;">
    <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1732997580/logos/sfrttgj1lm0ssqg72zb8.png" alt="carhub logo" height="30" width="200" style="margin: 5px auto" priority/>
  </div>
  <h3>Email Verification</h3>
  <p>Hi ${name},</p>
  <p>Someone (hopefully you) has requested to change your CarHub account password. 
  </p>
  <p>Please click the link below to reset your password now.</p>
    <a href="${url}" style="display:block; background-color:#22C55E; color:#fff; padding:10px 5px; border-radius:5px; text-align:center; width:50%; margin:10px auto; text-decoration:none;">Change My Password</a>
   <p>If you did not request to reset your password, please disregard this email.</p>
   <p>Kindly note that your password will not change unless you click the link above and create a new one. The link will expire in 24hrs.</p>
   <small>This email is for information purposes only. Kindly do not reply to this email</small>
      <hr style="border-color: #22C55E"/>
      <footer style="font-size: 12px; padding: 5px; margin: 10px 0px; text-align:center; color: #22C55E">  
      <table align="center" style="margin: 10px auto;">
        <tr>
          <td style="padding: 0 5px;">
            <a href="https://www.facebook.com/diamond.degesh.3" title="Facebook">
              <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/facebook-logo-removebg-preview_k2pief.png" alt="Facebook" width="30" height="30" >
            </a>
          </td>
          <td style="padding: 0 5px;">
            <a href="https://x.com/diamonddegesh" title="Twitter">
              <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/twitter-logo-removebg-preview_hc45pq.png" alt="Twitter" width="30" >
            </a>
          </td>
          <td style="padding: 0 5px;">
            <a href="https://instagram.com/Donvine254" title="instagram">
              <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1697311304/logos/instagram-logo-removebg-preview_jh0wxb.png" alt="instagram" width="30" height="30" >
            </a>
          </td>
        </tr>
      </table>
      <p style="font-weight:bold">123 Kimathi Street, Nairobi, Kenya</p>
      <p><a href="https://carhubke.vercel.app/privacy">Privacy Policy</a> | <a href="https://carhubke.vercel.app/help">Contact Details </a></p>
      </footer> 
    </div>
</body>`;

export const accountDeletionTemplate = (name) => ``;

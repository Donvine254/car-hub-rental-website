export const verificationTemplate = (
  name,
  url
) => `<div style="margin:5px auto; max-width: 768px; padding:5px;" >
    <div style="display: flex;justify-content: center; padding:5px; "> 
      <img src="https://res.cloudinary.com/dipkbpinx/image/upload/v1732997580/logos/sfrttgj1lm0ssqg72zb8.svg" alt="carhub logo" height="30" width="200"/>
</div>
<h3>Email Verification</h3>
<p>Hi ${name},</p>
<p>You're almost set to start enjoying CarHub services. Simply click the link below to verify your email address and get started. 
</p>
<p>The link expires in 24 hours.</p>
  <a href="${url}" style="display:block; background-color:#22C55E; color:#fff; padding:10px 5px; border-radius:5px; text-align:center; width:100%; margin:10px 0; text-decoration:none;">Verify Email Address</a>
 <p>If you are having any issues with your account, please don't hesitate to <a title="contact" href="https://carhubke.vercel.app/help">contact us.</a></p>
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

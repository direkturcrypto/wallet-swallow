import CryptoJS  from 'crypto-js'
import SecureStorage from 'secure-web-storage'

const SECRET_KEY = CryptoJS.SHA256(`A65D866E49B25C91CBA086F3C0FC0EC0EC0F1464FE1A65D1CBA086F3C0FC0EC0EC0F1464FE1BCB4A783ACA82ECBCB4A783ACA82EC`).toString()

const secureStorage = new SecureStorage(localStorage, {
	hash: function hash(key){
		const $key = CryptoJS.SHA256(key, SECRET_KEY)
        return $key.toString()
	},
	encrypt: function encrypt(data) {
        const $data = CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
        return $data;
    },
	decrypt: function decrypt(data) {
        let $data = CryptoJS.AES.decrypt(data, SECRET_KEY)
        try{
            $data = $data.toString(CryptoJS.enc.Utf8)
            if(!$data){
                localStorage.clear()
                window.location.reload()    
            }
        }catch(err){
            localStorage.clear()
            window.location.reload()
        }
        return $data
    }
})

export default secureStorage